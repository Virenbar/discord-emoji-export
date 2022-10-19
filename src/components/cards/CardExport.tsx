import _ from "lodash";
import React, { useEffect, useState } from "react";
import Toast from "../../helpers/toast";
import { GuildData } from "../../models";
import Export from "../../services/export";
import { Button } from "../elements/common/Button";
import { Emoji } from "../elements/Emoji";
import { Sticker } from "../elements/Sticker";

export function CardExport(props: GuildData) {
    const hasEmojis = props.emojis.length > 0;
    const hasStickers = props.stickers.length > 0;
    const [buttons, setButtons] = useState<State>({ emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers });
    useEffect(() => setButtons({ emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers }), [hasEmojis, hasStickers]);
    if (!props.guild) { return null; }

    const guild = props.guild;
    const emojis = props.emojis;
    const list = _.sortBy(props.emojis, e => e.name?.toLowerCase()).map(e => <Emoji key={e.id} emoji={e} />);
    const stickers = _.sortBy(props.stickers, e => e.name.toLowerCase()).map(e => <Sticker key={e.id} sticker={e} />);
    return (
        <div className="card">
            <div className="card-header d-flex align-items-center">
                <ul className="nav nav-pills" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" data-bs-toggle="tab" href="#export" aria-selected="true" role="tab">Download</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#browse" aria-selected="false" role="tab" tabIndex={-1}>Browse Emojis</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#sticker-browse" aria-selected="false" role="tab" tabIndex={-1}>Browse Stickers</a>
                    </li>
                </ul>
                <div className="text-muted ms-auto">{`${emojis.length} emojis - ${stickers.length} stickers`}</div>
            </div>

            <div className="card-body">
                <div className="tab-content">

                    <div id="export" className="tab-pane fade show active" role="tabpanel">
                        <div className="d-flex">
                            <div className="btn-group me-1">
                                <button className="btn btn-secondary disabled">Emojis</button>
                                <Button text="Download ZIP" onClick={exportEmojisZIP} disabled={!buttons.emojiZIP} />
                                <Button text="Download JSON" onClick={exportEmojisJSON} disabled={!buttons.emojiJSON} />
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-secondary disabled">Stickers</button>
                                <Button text="Download ZIP" onClick={exportStickersZIP} disabled={!buttons.emojiZIP} />
                            </div>
                        </div>
                        <div className="alert alert-info alert-dismissible fade show mt-1">
                            <span>
                                JSON contains only links to emojis
                            </span>
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    </div>

                    <div id="browse" className="tab-pane fade" role="tabpanel">
                        <div className="d-flex flex-wrap justify-content-center">
                            {list}
                        </div>
                    </div>
                    <div id="sticker-browse" className="tab-pane fade" role="tabpanel">
                        <div className="d-flex flex-wrap justify-content-center">
                            {stickers}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

    function exportEmojisJSON() {
        console.log("Generating JSON");
        setButtons({ ...buttons, emojiJSON: true });

        Export.saveEmojiJSON(guild, emojis);
        Toast.showSuccess("JSON generated");

        setButtons({ ...buttons, emojiJSON: false });
    }

    async function exportEmojisZIP() {
        console.log("Generating ZIP");
        setButtons({ ...buttons, emojiZIP: true });

        Toast.showInfo("Creating ZIP archive");
        await Export.saveEmojiZIP(guild, emojis);

        Toast.showSuccess("ZIP archive created");
        setButtons({ ...buttons, emojiZIP: false });
    }

    async function exportStickersZIP() {
        console.log("Generating ZIP");
        setButtons({ ...buttons, stickerZIP: true });

        Toast.showInfo("Creating ZIP archive");
        await Export.saveStickerZIP(guild, props.stickers);

        Toast.showSuccess("ZIP archive created");
        setButtons({ ...buttons, stickerZIP: false });
    }
}

interface State {
    emojiZIP: boolean
    emojiJSON: boolean
    stickerZIP: boolean
}
