import Link from "next/link";

function StudentInfo() {
  return (
    <p>
      My GitHub:{" "}
      <Link
        href="https://github.com/4d4n-HDZ/cprg306-assignments"
        style={{ textDecoration: "underline" }}>
        4d4n-HDZ/cprg306-assignments
      </Link>
    </p>
  );
}

export default StudentInfo;


