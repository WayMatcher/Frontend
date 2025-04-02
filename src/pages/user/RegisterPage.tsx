import '@/pages/_styles/RegisterPage.scss';

import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { useNavigate, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import User from '@/types/objects/User/dto';
import RegisterUser from '@/components/register/RegisterUser';
import Address from '@/types/objects/Address/dto';
import RegisterAddress from '@/components/register/RegisterAddress';
import Vehicle from '@/types/objects/Vehicle/dto';
import RegisterVehicleList from '@/components/register/RegisterVehicleList';

import RegisterSummary from '@/components/register/RegisterSummary';
import RegisterNavigation from '@/components/register/RegisterButtons';

/**
 * The RegisterPage component handles the multi-step registration process.
 * It includes user, address, and vehicle registration steps, as well as a summary step.
 */
const RegisterPage = () => {
    const navigate = useNavigate(); // Hook to programmatically navigate between routes
    const location = useLocation(); // Hook to access the current location
    const isAuthenticated = useIsAuthenticated(); // Hook to check if the user is authenticated

    // State to manage user data
    const [user, setUser] = useState<(User & { password: string }) | null>(null);
    // State to manage address data
    const [address, setAddress] = useState<Address | null>(null);
    // State to manage the list of vehicles
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

    // State to track completion of each step
    const [isUserDone, setIsUserDone] = useState(false);
    const [isAddressDone, setIsAddressDone] = useState(false);
    const [isVehicleListDone, setIsVehicleListDone] = useState(false);

    // Object containing all registration data
    const registerObject = { user, address, vehicleList };
    // Object tracking the completion status of each step
    const doneStates = { user: isUserDone, address: isAddressDone, vehicle: isVehicleListDone };

    // Define the steps of the registration process
    const steps = ['user', 'address', 'vehicles', 'summary'];
    // Determine the current step index based on the URL
    const currentStepIndex = steps.indexOf(location.pathname.split('/').pop() || 'user');
    // Calculate the progress percentage
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    // If the user is already authenticated, redirect them to their profile
    if (isAuthenticated) {
        return (
            <Container className='register-page'>
                <h1>Register</h1>
                <Container>
                    <h2>You are already logged in!</h2>
                    <Button variant='primary' onClick={() => navigate('/profile')}>
                        Go to your profile
                    </Button>
                </Container>
            </Container>
        );
    }

    return (
        <Container className='register-page'>
            <h1>Register</h1>
            {/* Display a progress bar to indicate the current step */}
            <ProgressBar now={progress} variant={currentStepIndex === steps.length - 1 ? 'success' : 'primary'} />
            <br />
            <Container>
                {/* Navigation component for moving between steps */}
                <RegisterNavigation
                    doneStates={{ user: isUserDone, address: isAddressDone, vehicle: isVehicleListDone }}
                >
                    <Routes>
                        {/* Route for the user registration step */}
                        <Route
                            path={steps[0]}
                            element={
                                <RegisterUser
                                    userState={[user, setUser]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsUserDone(isDone); // Update user step completion status
                                        },
                                    }}
                                />
                            }
                        />
                        {/* Route for the address registration step */}
                        <Route
                            path={steps[1]}
                            element={
                                <RegisterAddress
                                    addressState={[address, setAddress]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsAddressDone(isDone); // Update address step completion status
                                        },
                                    }}
                                />
                            }
                        />
                        {/* Route for the vehicle registration step */}
                        <Route
                            path={steps[2]}
                            element={
                                <RegisterVehicleList
                                    vehicleListState={[vehicleList, setVehicleList]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsVehicleListDone(isDone); // Update vehicle step completion status
                                        },
                                    }}
                                />
                            }
                        />
                        {/* Route for the summary step */}
                        <Route
                            path={steps[3]}
                            element={
                                registerObject.user !== null && registerObject.address !== null ? (
                                    <RegisterSummary
                                        register={
                                            registerObject as {
                                                user: User & { password: string };
                                                address: Address;
                                                vehicleList: Vehicle[];
                                            }
                                        }
                                    />
                                ) : null
                            }
                        />
                        {/* Redirect to the first step if the path is invalid */}
                        <Route path='/*' element={<Navigate to={'/register/user'} replace />} />
                    </Routes>
                </RegisterNavigation>
            </Container>
        </Container>
    );
};

export default RegisterPage;
