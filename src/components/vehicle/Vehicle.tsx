import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap';
import FormInput from '../FormInput';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import Vehicle from '@/types/objects/Vehicle/dto';
import { useEffect } from 'react';

/**
 * Component for displaying and editing a single vehicle entry.
 *
 * @param vehicle - The vehicle object to display or edit.
 * @param vehicleListState - State containing the list of vehicles and its setter function.
 * @param onDelete - Callback function to handle vehicle deletion.
 */
const VehicleEntry = ({
    vehicle,
    vehicleListState,
    onDelete,
}: {
    vehicle: Vehicle;
    vehicleListState: [Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>];
    onDelete: (vehicleId: number) => Promise<void>;
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

    /**
     * Handles form submission to update or add a vehicle.
     *
     * @param values - The form values representing the vehicle.
     * @param formikHelpers - Formik helpers for managing form state.
     */
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

    /**
     * Deletes the current vehicle from the list.
     */
    const deleteSelf = () => {
        const updatedVehicles = vehicleList.filter((v) => v.vehicleId !== vehicle.vehicleId);
        if (vehicle.vehicleId) onDelete(vehicle.vehicleId);
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
                            <FormInput
                                label='Fuel Milage (L/100km)'
                                name='fuelMilage'
                                type='number'
                                formikProps={formikProps}
                            />
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
