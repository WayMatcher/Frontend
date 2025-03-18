interface IconProps {
    icon: string;
}

export default function Icon({ ...props }: IconProps) {
    return (
        <>
            <span className={"bi " + props.icon} />
        </>
    )
}