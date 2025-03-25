import { Formik, Form as FormikForm, FormikHelpers } from 'formik';
import { Button, ButtonGroup, Row } from 'react-bootstrap';
import FormInput from '../FormInput';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import Vehicle from '@/types/objects/Vehicle/dto';

const VehicleEntry = ({
    vehicle,
    vehicleListState,
}: {
    vehicle: Vehicle;
    vehicleListState: [Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>];
}) => {
    const [vehicleList, setVehicleList] = vehicleListState;

    const initialValues: Vehicle = {
        make: '',
        model: '',
        year: 2025,
        seats: 4,
        license_plate: '',
    };

    const onSubmit = (values: typeof initialValues, formikHelpers: FormikHelpers<Vehicle>) => {
        formikHelpers.setSubmitting(true);
        const vehicleIndex = vehicleList.findIndex((v) => v.id === vehicle.id);
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
        const updatedVehicles = vehicleList.filter((v) => v.id !== vehicle.id);
        setVehicleList(updatedVehicles);
    };

    const validationSchema = RegisterVehicleSchema;

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {(formikProps) => (
                <FormikForm>
                    <strong>Vehicle </strong>
                    <i>{vehicle.license_plate}</i>
                    <Row className='mb-3'>
                        <FormInput label='Make' name='make' type='text' formikProps={formikProps} />
                        <FormInput label='Model' name='model' type='text' formikProps={formikProps} />
                    </Row>
                    <Row className='mb-3'>
                        <FormInput label='Year' name='year' type='number' formikProps={formikProps} />
                        <FormInput label='Seats' name='seats' type='number' formikProps={formikProps} />
                    </Row>
                    <Row className='mb-3'>
                        <FormInput label='License Plate' name='license_plate' type='text' formikProps={formikProps} />
                    </Row>
                    <Row>
                        <ButtonGroup>
                            <Button variant='warning' onClick={() => deleteSelf()}>
                                Delete
                            </Button>
                            <Button type='submit'>{formikProps.isSubmitting ? 'Saving...' : 'Save'}</Button>
                        </ButtonGroup>
                    </Row>
                </FormikForm>
            )}
        </Formik>
    );
};

export default VehicleEntry;
