import '@/pages/styles/RegisterPage.scss';

import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import User from '@/types/objects/User/dto';
import RegisterUser from '@/components/register/RegisterUser';
import Address from '@/types/objects/Address/dto';
import RegisterAddress from '@/components/register/RegisterAddress';
import Vehicle from '@/types/objects/Vehicle/dto';
import RegisterVehicleList from '@/components/register/RegisterVehicleList';

import RegisterSummary from '@/components/register/RegisterSummary';
import RegisterNavButtons from '@/components/register/RegisterButtons';

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

    const steps = ['user', 'address', 'vehicles', 'summary'];
    const currentStepIndex = steps.indexOf(location.pathname.split('/').pop() || 'user');
    const progress = ((currentStepIndex + 1) / steps.length) * 100;

    if (isAuthenticated) {
        return (
            <Container className='register-page'>
                <h1>Register</h1>
                <Container>
                    <h2>You are already logged in!</h2>
                    <Button variant='primary' onClick={() => navigate('/user')}>
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
            <Container>
                <Routes>
                    <Route
                        path={steps[0]}
                        element={
                            <RegisterUser
                                userState={[user, setUser]}
                                onComplete={(isDone: boolean) => setIsUserDone(isDone)}
                            />
                        }
                    />
                    <Route
                        path={steps[1]}
                        element={
                            <RegisterAddress
                                addressState={[address, setAddress]}
                                onComplete={(isDone: boolean) => setIsAddressDone(isDone)} // Mark as done based on completion
                            />
                        }
                    />
                    <Route
                        path={steps[2]}
                        element={
                            <RegisterVehicleList
                                vehicleListState={[vehicleList, setVehicleList]}
                                onComplete={(isDone: boolean) => setIsVehicleListDone(isDone)}
                            />
                        }
                    />
                    <Route
                        path={steps[3]}
                        element={
                            registerObject.user !== null &&
                            registerObject.address !== null &&
                            registerObject.vehicleList.length > 0 ? (
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
                    <Route
                        path='/'
                        element={<Button onClick={() => navigate('/register/user')}>Start Registration</Button>}
                    />
                </Routes>
                <RegisterNavButtons
                    doneStates={{ user: isUserDone, address: isAddressDone, vehicle: isVehicleListDone }}
                />
            </Container>
        </Container>
    );
};

export default RegisterPage;
