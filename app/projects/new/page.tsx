import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/app/projects/_components/ProjectForm"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const NewProjectPage = () => {
  return (
    <div>
      <ProjectForm />
    </div>
  );
};

export default NewProjectPage;
