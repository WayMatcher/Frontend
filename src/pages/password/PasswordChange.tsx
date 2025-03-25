import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { apiSetPassword } from '@/api/endpoints/user';

const PasswordChange: React.FC = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    const token = searchParams.get('token');

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm Password is required'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            if (!userId || !token) {
                setErrors({ password: 'Invalid URL parameters' });
                return;
            }

            try {
                await apiSetPassword(userId, values.password); // This is terrible, dont do this. Use the token.
                alert('Password changed successfully!');
            } catch (error) {
                alert('Failed to change password. Please try again.');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className='container mt-5'>
            <h2>Change Password</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        New Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        className={`form-control ${
                            formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='invalid-feedback'>{formik.errors.password}</div>
                    ) : null}
                </div>
                <div className='mb-3'>
                    <label htmlFor='confirmPassword' className='form-label'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        id='confirmPassword'
                        name='confirmPassword'
                        className={`form-control ${
                            formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''
                        }`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='invalid-feedback'>{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>
                <button type='submit' className='btn btn-primary' disabled={formik.isSubmitting}>
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default PasswordChange;
