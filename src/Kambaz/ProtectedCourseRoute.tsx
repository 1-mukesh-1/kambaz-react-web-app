import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import type { ReactNode } from "react";

export default function PrivateCourseRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.course === courseId && e.user === currentUser._id);

  if (!currentUser || !cid || !isEnrolled(cid)) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

  return <>{children}</>;
}