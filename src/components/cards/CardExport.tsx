import _ from "lodash";
import { useEffect, useState } from "preact/hooks";
import { HandleError } from "../../helpers";
import Toast from "../../helpers/toast";
import { GuildData } from "../../models";
import Export from "../../services/export";
import { AlertDownload } from "../elements/alerts/AlertDownload";
import { Button } from "../elements/common/Button";
import { ButtonLabel } from "../elements/common/ButtonLabel";
import { Emoji } from "../elements/Emoji";
import { Sticker } from "../elements/Sticker";

export function CardExport(props: GuildData) {
    const hasEmojis = props.emojis.length > 0;
    const hasStickers = props.stickers.length > 0;
    const [buttons, setButtons] = useState<State>({ emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers });
    useEffect(() => setButtons({ emojiZIP: hasEmojis, emojiJSON: hasEmojis, stickerZIP: hasStickers }), [hasEmojis, hasStickers]);
    if (!props.guild) { return null; }

    const guild = props.guild;
    const emojis = _.sortBy(props.emojis, e => e.name?.toLowerCase()).map(e => <Emoji key={e.id} emoji={e} />);
    const stickers = _.sortBy(props.stickers, e => e.name.toLowerCase()).map(e => <Sticker key={e.id} sticker={e} />);
    return (
        <div class="card">
            <div class="card-header d-flex align-items-center">
                <ul class="nav nav-pills" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" data-bs-toggle="tab" href="#export" aria-selected="true" role="tab">Download</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#browse" aria-selected="false" role="tab" tabIndex={-1}>Browse Emojis</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" data-bs-toggle="tab" href="#sticker-browse" aria-selected="false" role="tab" tabIndex={-1}>Browse Stickers</a>
                    </li>
                </ul>
                <div class="text-muted ms-auto">{`${emojis.length} emojis - ${stickers.length} stickers`}</div>
            </div>
            <div class="card-body">
                <div class="tab-content">
                    <div id="export" class="tab-pane fade show active" role="tabpanel">
                        <div class="d-flex">
                            <div class="btn-group me-1">
                                <ButtonLabel text="Emojis" />
                                <Button text="Download ZIP" onClick={exportEmojisZIP} disabled={!buttons.emojiZIP} />
                                <Button text="Download JSON" onClick={exportEmojisJSON} disabled={!buttons.emojiJSON} />
                            </div>
                            <div class="btn-group">
                                <ButtonLabel text="Stickers" />
                                <Button text="Download ZIP" onClick={exportStickersZIP} disabled={!buttons.stickerZIP} />
                            </div>
                        </div>
                        <AlertDownload />
                    </div>
                    <div id="browse" class="tab-pane fade" role="tabpanel">
                        <div class="d-flex flex-wrap justify-content-center">
                            {emojis}
                        </div>
                    </div>
                    <div id="sticker-browse" class="tab-pane fade" role="tabpanel">
                        <div class="d-flex flex-wrap justify-content-center">
                            {stickers}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function exportEmojisJSON() {
        console.log("Generating JSON");
        setButtons({ ...buttons, emojiJSON: false });

        Export.saveEmojiJSON(guild, props.emojis);
        Toast.showSuccess("JSON generated");
        setButtons({ ...buttons, emojiJSON: true });
    }

    async function exportEmojisZIP() {
        console.log("Generating ZIP");
        try {
            setButtons({ ...buttons, emojiZIP: false });
            Toast.showInfo("Creating ZIP archive");
            await Export.saveEmojiZIP(guild, props.emojis);
            Toast.showSuccess("ZIP archive created");
        } catch (error) {
            HandleError(error);
        } finally {
            setButtons({ ...buttons, emojiZIP: true });
        }
    }

    async function exportStickersZIP() {
        console.log("Generating ZIP");
        try {
            setButtons({ ...buttons, stickerZIP: false });
            Toast.showInfo("Creating ZIP archive");
            await Export.saveStickerZIP(guild, props.stickers);
            Toast.showSuccess("ZIP archive created");
        } catch (error) {
            HandleError(error);
        } finally {
            setButtons({ ...buttons, stickerZIP: true });
        }
    }
}

interface State {
    emojiZIP: boolean
    emojiJSON: boolean
    stickerZIP: boolean
}
