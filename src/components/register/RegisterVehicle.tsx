import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import FormInput from '../FormInput';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import Vehicle from '@/types/objects/Vehicle/dto';
import { useEffect } from 'react';

const VehicleEntry = ({
    vehicle,
    vehicleListState,
}: {
    vehicle: Vehicle;
    vehicleListState: [Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>];
}) => {
    const [vehicleList, setVehicleList] = vehicleListState;

    const initialValues: Vehicle = {
        manufacturerName: '',
        model: '',
        yearOfManufacture: 0,
        seats: 1,
        licensePlate: '',
        fuelMilage: 0,
        additionalInfo: '',
    };

    const onSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<Vehicle>) => {
        formikHelpers.setSubmitting(true);
        const vehicleIndex = vehicleList.findIndex((v) => v.vehicleId === vehicle.vehicleId);
        const updatedVehicles = [...vehicleList];

        if (vehicleIndex !== -1) {
            updatedVehicles[vehicleIndex] = values;
        } else {
            updatedVehicles.push(values);
        }

        setVehicleList(updatedVehicles);
        formikHelpers.setSubmitting(false);
    };

    const deleteSelf = () => {
        const updatedVehicles = vehicleList.filter((v) => v.vehicleId !== vehicle.vehicleId);
        setVehicleList(updatedVehicles);
    };

    const validationSchema = RegisterVehicleSchema;

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formikProps) => {
                const { setValues } = formikProps; // Access Formik context here

                useEffect(() => {
                    if (vehicle) {
                        setValues({
                            ...initialValues,
                            ...vehicle,
                        });
                    }
                }, [vehicle, setValues]);
                return (
                    <FormikForm>
                        {vehicle.licensePlate && (
                            <>
                                <strong>Vehicle </strong>
                                <i>{vehicle.licensePlate}</i>
                            </>
                        )}
                        <Row className='mb-3'>
                            <FormInput label='Make' name='manufacturerName' type='text' formikProps={formikProps} />
                            <FormInput label='Model' name='model' type='text' formikProps={formikProps} />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput label='Year' name='yearOfManufacture' type='number' formikProps={formikProps} />
                            <FormInput label='Seats' name='seats' type='number' formikProps={formikProps} />
                            <FormInput label='Fuel Milage' name='fuelMilage' type='number' formikProps={formikProps} />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='License Plate'
                                name='licensePlate'
                                type='text'
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row className='mb-3'>
                            <FormInput
                                label='Additional Info'
                                name='additionalInfo'
                                type='text'
                                placeholder={'e.g. color, special features'}
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button variant='outline-secondary' onClick={() => deleteSelf()}>
                                        Delete
                                    </Button>
                                    <Button type='submit' variant='primary'>
                                        {formikProps.isSubmitting ? 'Saving...' : 'Save'}
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </FormikForm>
                );
            }}
        </Formik>
    );
};

export default VehicleEntry;
