import { useState } from "react";
import EditAddress from "../../components/user/EditAddress";
import EditUser from "../../components/user/EditUser";
import EditVehicle from "../../components/user/EditVehicle";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/ErrorModal";
import { Form as FormikForm, Formik } from "formik";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from "../../types/dto/User";

export default function UserPage() {

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const handleSubmit = async () => {
        try {
            // Submit user data
        } catch {
            setSubmissionError("Test");
            setShowErrorModal(true);
        }
    }

    if (!authUser) {
        return (
            <Container className="user-page">
                <h2>Not logged in!</h2>
                <Button onClick={() => { navigate('/user/login') }}>Log in</Button>
            </Container>
        );

    } else {
        return (
            <div>
                <Container className="user-page">
                    <h1>Welcome {authUser.firstName} {authUser.name} </h1>
                    <Container>
                        <br />
                        <Formik
                            initialValues={{}}
                            onSubmit={handleSubmit}
                        >
                            <FormikForm>
                                <h2>Edit your profile</h2>
                                <EditUser setShowErrorModal={setShowErrorModal} setSubmissionError={setSubmissionError} />
                                <hr />
                                <EditAddress setShowErrorModal={setShowErrorModal} setSubmissionError={setSubmissionError} />
                                <hr />
                                <EditVehicle setShowErrorModal={setShowErrorModal} setSubmissionError={setSubmissionError} />
                                <br />
                                <Button type='submit'>Save</Button>
                            </FormikForm>
                        </Formik>
                    </Container>
                </Container>
                <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} >
                    {submissionError}
                </ErrorModal>
                <br />
            </div>
        );
    }
}