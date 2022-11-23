
export function AlertToken() {
    return (
        <div class="alert alert-warning alert-dismissible fade show my-1">
            <span>
                <strong>Warning: do not share your token with anyone!</strong><br />
                This website uses your token only to authenticate with Discord, fetch your server list and their emojis and stickers.<br />
                Token is saved locally. Clear it after you done.
            </span>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}
