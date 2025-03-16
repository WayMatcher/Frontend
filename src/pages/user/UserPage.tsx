import { useContext, useState } from "react";
import EditAddress from "../../components/user/EditAddress";
import EditUser from "../../components/user/EditUser";
import EditVehicle from "../../components/user/EditVehicle";
import UserContext from "../../contexts/UserContext";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../components/ErrorModal";
import { Form as FormikForm, Formik } from "formik";

export default function UserPage() {
    const { user } = useContext(UserContext);

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    if (!user || !user.jwt) {
        return (
            <Container className="register-page">
                <h2>Not logged in!</h2>
                <Button onClick={() => { navigate('/user/login') }}>Log in</Button>
            </Container >

        );

    } else {
        return (
            <div>
                <Container className="register-page">
                    <h1>Welcome {user.firstName} {user.name} </h1>
                    <Container>
                        <br />
                        <Formik
                            initialValues={{}}
                            onSubmit={async (values) => {
                                console.log(values);
                            }}
                        >
                            <FormikForm>
                                <h2>Edit your profile</h2>
                                <EditUser />
                                <hr />
                                <EditAddress />
                                <hr />
                                <EditVehicle />
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