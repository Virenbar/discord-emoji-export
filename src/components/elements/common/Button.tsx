
export function Button(props: Props) {
    return (
        <button
            type="button"
            class="btn btn-primary"
            disabled={props.disabled}
            onClick={props.onClick}>
            {props.text}
        </button>
    );
}

interface Props {
    text: string
    onClick: () => void
    disabled?: boolean
}
