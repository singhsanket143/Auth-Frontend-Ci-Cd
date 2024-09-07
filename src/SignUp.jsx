import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSignup = async (values, { setSubmitting, setErrors }) => {
    const user = new Parse.User();
    user.set("username", values.username);
    user.set("password", values.password);
    user.set("email", values.email);

    try {
      await user.signUp();
      localStorage.setItem('sessionToken', user.getSessionToken());
      navigate('/home');
    } catch (e) {
      setErrors({ server: e.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-radial from-primary via-secondary to-purple-500">
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ isSubmitting, errors }) => (
          <Form className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-center text-gray-700">Sign Up</h2>
            {errors.server && <p className="text-red-500 text-sm">{errors.server}</p>}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <Field 
                type="text" 
                name="username" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <Field 
                type="email" 
                name="email" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <Field 
                type="password" 
                name="password" 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full p-3 mt-4 text-white bg-primary rounded-md hover:bg-secondary transition-all duration-300"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
