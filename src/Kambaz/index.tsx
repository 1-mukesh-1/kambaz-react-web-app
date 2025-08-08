import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useEffect, useState } from "react";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";
import { useDispatch, useSelector } from "react-redux";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import * as coursesClient from "./Courses/client";
import { setCourses } from "./Courses/reducer";

export default function Kambaz() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer || { courses: [] });
  const fetchCourses = async () => {
    try {
      const courses = await coursesClient.fetchAllCourses();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    await coursesClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course: { _id: string; }) => course?._id !== courseId)));
  };

  const updateCourse = async () => {
    await coursesClient.updateCourse(course);
    dispatch(setCourses(courses.map((c: { _id: string; }) => (c._id === course._id ? course : c))));
  };

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchCourses();
    }
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "0000",
    name: "Temp Course",
    number: "9283",
    startDate: "2021-10-23",
    endDate: "2024-10-16",
    description: "State of the art tech",
    department: "CS",
    credits: 4,
  });

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
                  />
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <PrivateCourseRoute>
                    <Courses courses={courses} />
                  </PrivateCourseRoute>
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </div>
      </div>
    </Session>
  );
}