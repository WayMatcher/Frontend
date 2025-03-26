import React, { useContext } from 'react';

import { Form as FormikForm, Formik } from 'formik';
import { Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import EditButtons from '@/components/user/EditButtons';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetVehicleList, apiSetVehicle } from '@/api/endpoints/vehicle';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import LoadingOverlay from '../LoadingOverlay';

export default function EditVehicle(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const authUser = useAuthUser<User>();

    const validationSchema = RegisterVehicleSchema;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                const response = await apiGetVehicleList({ userID: authUser.userId });
                setVehicles(response.data);
            } catch (error: unknown) {
                showErrorModal((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (values: Vehicle) => {
        try {
            const response = await apiSetVehicle({ vehicle: values });
            console.log(response);
        } catch (error: unknown) {
            showErrorModal((error as Error).message);
        }
    };

    return (
        <>
            <h2>Vehicle</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={isLoading}>
                    {vehicles.map((vehicle) => (
                        <Formik
                            key={vehicle.vehicleId}
                            initialValues={{
                                make: vehicle.manufacturerName || '',
                                model: vehicle.model || '',
                                year: vehicle.yearOfManufacture || 2025,
                                seats: vehicle.seats || 4,
                                license_plate: vehicle.licensePlate || '',
                                additional_description: vehicle.additionalInfo || '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={() => {
                                handleSubmit(vehicle);
                            }}
                        >
                            {(formikProps) => (
                                <FormikForm>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='Make'
                                            name='make'
                                            type='text'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                        <FormInput
                                            label='Model'
                                            name='model'
                                            type='text'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='Year'
                                            name='year'
                                            type='number'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                        <FormInput
                                            label='Seats'
                                            name='seats'
                                            type='number'
                                            isLoading={isLoading}
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <Row className='mb-3'>
                                        <FormInput
                                            label='License Plate'
                                            name='license_plate'
                                            type='text'
                                            formikProps={formikProps}
                                        />
                                    </Row>
                                    <br />
                                    <EditButtons isLoading={isLoading} isSubmitting={formikProps.isSubmitting} />
                                </FormikForm>
                            )}
                        </Formik>
                    ))}
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
