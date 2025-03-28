import '@/pages/styles/RegisterPage.scss';

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

const RegisterPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = useIsAuthenticated();

    const [user, setUser] = useState<(User & { password: string }) | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicleList, setVehicleList] = useState<Vehicle[]>([]);

    const [isUserDone, setIsUserDone] = useState(false);
    const [isAddressDone, setIsAddressDone] = useState(false);
    const [isVehicleListDone, setIsVehicleListDone] = useState(false);

    const registerObject = { user, address, vehicleList };
    const doneStates = { user: isUserDone, address: isAddressDone, vehicle: isVehicleListDone };

    const steps = ['user', 'address', 'vehicles', 'summary'];
    const currentStepIndex = steps.indexOf(location.pathname.split('/').pop() || 'user');
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

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
            <ProgressBar now={progress} variant={currentStepIndex === steps.length - 1 ? 'success' : 'primary'} />
            <br />
            <Container>
                <RegisterNavigation
                    doneStates={{ user: isUserDone, address: isAddressDone, vehicle: isVehicleListDone }}
                >
                    <Routes>
                        <Route
                            path={steps[0]}
                            element={
                                <RegisterUser
                                    userState={[user, setUser]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsUserDone(isDone);
                                        },
                                    }}
                                />
                            }
                        />
                        <Route
                            path={steps[1]}
                            element={
                                <RegisterAddress
                                    addressState={[address, setAddress]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsAddressDone(isDone);
                                        },
                                    }}
                                />
                            }
                        />
                        <Route
                            path={steps[2]}
                            element={
                                <RegisterVehicleList
                                    vehicleListState={[vehicleList, setVehicleList]}
                                    done={{
                                        ...doneStates,
                                        onComplete(isDone) {
                                            setIsVehicleListDone(isDone);
                                        },
                                    }}
                                />
                            }
                        />
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
                        <Route path='/*' element={<Navigate to={'/register/user'} replace />} />
                    </Routes>
                </RegisterNavigation>
            </Container>
        </Container>
    );
};

export default RegisterPage;
