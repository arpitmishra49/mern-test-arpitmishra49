import Course from '../models/Course.js';


const getAllCourses = async (search = '') => {
  let query = {};

  if (search) {
    query = {
      $or: [
        { courseName: { $regex: search, $options: 'i' } },
        { courseDescription: { $regex: search, $options: 'i' } },
        { instructor: { $regex: search, $options: 'i' } },
      ],
    };
  }

  return await Course.find(query)
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 });
};


const createCourse = async ({ courseName, courseDescription, instructor, studentId }) => {
  return await Course.create({
    courseName,
    courseDescription,
    instructor,
    createdBy: studentId,
  });
};


const updateCourse = async (courseId, updates, studentId) => {
  const course = await Course.findById(courseId);

  if (!course) throw new Error('Course not found');
  if (course.createdBy.toString() !== studentId.toString()) {
    throw new Error('Not authorized to edit this course');
  }

  course.courseName = updates.courseName || course.courseName;
  course.courseDescription = updates.courseDescription || course.courseDescription;
  course.instructor = updates.instructor || course.instructor;

  return await course.save();
};


const deleteCourse = async (courseId, studentId) => {
  const course = await Course.findById(courseId);

  if (!course) throw new Error('Course not found');
  if (course.createdBy.toString() !== studentId.toString()) {
    throw new Error('Not authorized to delete this course');
  }

  await course.deleteOne();
};

export { getAllCourses, createCourse, updateCourse, deleteCourse };