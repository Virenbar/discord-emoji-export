
export function ButtonLabel(props: Props) {
    return <span class="btn btn-secondary disabled">{props.text}</span>;
}

interface Props {
    text: string
}
