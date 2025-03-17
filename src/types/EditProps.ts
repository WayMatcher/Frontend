export default interface EditProps {
    setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSubmissionError: React.Dispatch<React.SetStateAction<string | null>>
}