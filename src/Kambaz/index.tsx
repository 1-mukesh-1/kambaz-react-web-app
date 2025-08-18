import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import PrivateCourseRoute from "./ProtectedCourseRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import { setCourses as setCoursesInReducer } from "./Courses/reducer";
import { setEnrollments, enrollCourse, unenrollCourse } from "./reducer";

export default function Kambaz() {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state: any) => state.accountReducer);
	const [courses, setCourses] = useState<any[]>([]);
	const [enrolling, setEnrolling] = useState<boolean>(false);

	const fetchUserEnrollments = async () => {
		if (!currentUser?._id) return;
		try {
			const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
			const enrollmentObjects = enrolledCourses.map((c: any) => ({
				_id: `${currentUser._id}-${c._id}`,
				user: currentUser._id,
				course: c._id,
			}));
			dispatch(setEnrollments(enrollmentObjects));
		} catch (error) {
			console.error("Failed to fetch user enrollments:", error);
		}
	}

	const fetchAllCoursesWithEnrollmentStatus = async () => {
		if (!currentUser?._id) return;
		try {
			const allCourses = await courseClient.fetchAllCourses();
			const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
			const enrolledCourseIds = new Set(enrolledCourses.map((c: any) => c._id));

			const updatedCourses = allCourses.map((course: any) => ({
				...course,
				enrolled: enrolledCourseIds.has(course._id),
			}));
			setCourses(updatedCourses);
			dispatch(setCoursesInReducer(updatedCourses));
		} catch (error) {
			console.error("Failed to fetch all courses:", error);
		}
	};

	const findMyCourses = async () => {
		if (!currentUser?._id) return;
		try {
			const myCourses = await userClient.findCoursesForUser(currentUser._id);
			setCourses(myCourses);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (currentUser?._id) {
			fetchUserEnrollments();
			if (enrolling) {
				fetchAllCoursesWithEnrollmentStatus();
			} else {
				findMyCourses();
			}
		} else {
			setCourses([]);
			dispatch(setEnrollments([]));
		}
	}, [currentUser, enrolling]);

	const updateEnrollment = async (courseId: string, newEnrolledState: boolean) => {
		if (!currentUser?._id) return;
		try {
			if (newEnrolledState) {
				await userClient.enrollIntoCourse(currentUser._id, courseId);
				dispatch(enrollCourse({ userId: currentUser._id, courseId }));
			} else {
				await userClient.unenrollFromCourse(currentUser._id, courseId);
				dispatch(unenrollCourse({ userId: currentUser._id, courseId }));
			}
			setCourses(
				courses.map((course) => {
					if (course._id === courseId) {
						return { ...course, enrolled: newEnrolledState };
					}
					return course;
				})
			);
		} catch (error) {
			console.error("Failed to update enrollment", error);
		}
	};

	const [course, setCourse] = useState<any>({
		name: "",
		number: "",
		startDate: new Date().toISOString().split('T')[0],
		endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
		description: "",
		department: "",
		credits: 3,
	});

	const addNewCourse = async () => {
		try {
			console.log("Creating course with data:", course);
			
			const courseData = {
				...course,
				author: currentUser?._id,
			};
			
			const newCourse = await courseClient.createCourse(courseData);
			console.log("Course created successfully:", newCourse);
			
			const courseWithEnrollment = { ...newCourse, enrolled: true };
			setCourses([...courses, courseWithEnrollment]);
			
			if (currentUser?._id) {
				try {
					await userClient.enrollIntoCourse(currentUser._id, newCourse._id);
					dispatch(enrollCourse({ userId: currentUser._id, courseId: newCourse._id }));
				} catch (enrollError) {
					console.warn("Failed to auto-enroll in course:", enrollError);
				}
			}

			setCourse({
				name: "",
				number: "",
				startDate: new Date().toISOString().split('T')[0],
				endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
				description: "",
				department: "",
				credits: 3,
			});
		} catch (error: any) {
			console.error("Error creating course:", error);
			alert(`Failed to create course: ${error.response?.data?.message || error.message}`);
		}
	};

	const deleteCourse = async (courseId: string) => {
		try {
			await courseClient.deleteCourse(courseId);
			setCourses(courses.filter((c) => c._id !== courseId));
		} catch (error: any) {
			console.error("Error deleting course:", error);
			alert(`Failed to delete course: ${error.response?.data?.message || error.message}`);
		}
	};

	const updateCourse = async () => {
		try {
			await courseClient.updateCourse(course);
			setCourses(
				courses.map((c) => (c._id === course._id ? course : c))
			);
		} catch (error: any) {
			console.error("Error updating course:", error);
			alert(`Failed to update course: ${error.response?.data?.message || error.message}`);
		}
	};

	return (
		<Session>
			<div id="wd-kambaz">
				<KambazNavigation />
				<div className="wd-main-content-offset p-3">
					<Routes>
						<Route path="/" element={<Navigate to="Dashboard" />} />
						<Route path="Account/*" element={<Account />} />
						<Route
							path="Dashboard"
							element={
								<ProtectedRoute>
									<Dashboard
										courses={courses}
										course={course}
										setCourse={setCourse}
										addCourse={addNewCourse}
										deleteCourse={deleteCourse}
										updateCourse={updateCourse}
										enrolling={enrolling}
										setEnrolling={setEnrolling}
										updateEnrollment={updateEnrollment}
									/>
								</ProtectedRoute>
							}
						/>
						<Route
							path="Courses/:cid/*"
							element={
								<ProtectedRoute>
									<PrivateCourseRoute>
										<Courses courses={courses} />
									</PrivateCourseRoute>
								</ProtectedRoute>
							}
						/>
					</Routes>
				</div>
			</div>
		</Session>
	);
}