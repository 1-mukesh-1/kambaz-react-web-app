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
		_id: "1234",
		name: "New Course",
		number: "New Number",
		startDate: "2023-09-10",
		endDate: "2023-12-15",
		description: "New Description",
		department: "CS",
		credits: 4,
	});

	const addNewCourse = async () => {
		const newCourse = await courseClient.createCourse(course);
		setCourses([...courses, { ...newCourse, enrolled: true }]);
	};

	const deleteCourse = async (courseId: string) => {
		await courseClient.deleteCourse(courseId);
		setCourses(courses.filter((c) => c._id !== courseId));
	};

	const updateCourse = async () => {
		await courseClient.updateCourse(course);
		setCourses(
			courses.map((c) => (c._id === course._id ? course : c))
		);
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