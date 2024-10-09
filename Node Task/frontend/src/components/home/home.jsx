import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center my-5">
          <div className="mx-5 mb-5 w-full max-w-3xl">
            <img
              src="/task.jpg"
              alt="school-management-system"
              className="w-full h-auto max-w-full mt-16"
            />
          </div>
          <div className="mx-5 w-full max-w-3xl">
            <p className="text-md mb-4">
              A school management system is an information management system for educational institutions to manage student data. It helps teachers get information about students faster, easier and reduces their workload.
            </p>
            <p className="text-md mb-4">
              School management systems (SMS) are software applications that help schools to streamline their operations and improve efficiency. SMS can be used to track student information, manage attendance, grade assignments, and communicate with parents.
            </p>
            <p className="text-md mb-4">
              School Management Systems Plays an essential role in the current educational system. School authorities all over the world are engaged in a lot of day-to-day administrative and academic activities to manage and provide a better academic experience to students effectively. However, maintaining and keeping track of school administrative activities is not an easy process in the fast-growing world. It requires hard work and often it is time-consuming.
            </p>
            <p className="text-md mb-4">
              To better perform the school administrative activities of educational institute and to assure parents the real-time progress and security of their children, educational institutes utilize School Management software nowadays. Such applications often offer many features that help to enhance the performance of schools with minimum efforts. School Management software does it by avoiding the manual paper works and automation of many academic and administrative activities. Now let us take a look at why institutes need to implement it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
