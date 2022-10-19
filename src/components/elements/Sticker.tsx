import { APISticker } from "discord-api-types/v10";
import React from "react";
import Toast from "../../helpers/toast";
import D from "../../services/discord";
import Export from "../../services/export";

export function Sticker(props: Props) {
    const sticker = props.sticker;
    const url = D.stickerURL(sticker);
    return (
        <div className="sticker card m-1 border-primary">
            <div className="card-header text-center">
                <span>{sticker.name}</span>
            </div>
            <div className="card-body d-flex flex-column text-center">
                <div>
                    <a className="align-items-center" target="_blank" rel="noopener noreferrer" href={url}>
                        <img src={`${url}?size=128`} alt={sticker.name} />
                    </a>
                </div>
                <button className="btn btn-primary" onClick={download}>Download</button>
            </div>
        </div>
    );

    async function download() {
        try {
            await Export.saveSticker(sticker);
        } catch (e) {
            console.log(e);
            if (e instanceof Error) {
                Toast.showError(Error.name);
            }
        }
    }
}
interface Props {
    sticker: APISticker
}
