export interface RegisterStep {
    stepNumber: number;
    isValid: boolean;
}

export default interface RegisterSteps {
    registerSteps: RegisterStep[];
    isCompleted: boolean;
    currentStep: number;
    handleNext: () => void;
    handlePrevious: () => void;
    setStepValidity: (stepNumber: number, isValid: boolean) => void;
}