import Logo from "../Logo";
import { SideLink } from "./SideLink";

export default function LeftSidebar() {
    return (
        <aside
            onContextMenu={(e) => e.preventDefault()}
            className="w-72 border-r h-screen border-dashed"
        >
            <div className="sticky top-0 left-0">
                {/* Logo */}
                <Logo />
                {/* Menu place here... */}
                <div className="flex flex-col mt-6 gap-3 px-3">
                    <SideLink
                        icon="bi bi-folder-fill"
                        href="/"
                        title="My Files"
                    />
                    <SideLink
                        icon="bi bi-share-fill"
                        href="/share-with-me"
                        title="Shared with me"
                    />
                    <SideLink
                        icon="bi bi-star-fill"
                        href="/started"
                        title="Starred"
                    />
                    <SideLink
                        icon="bi bi-trash-fill"
                        href="/trash"
                        title="Trash"
                    />
                    <SideLink
                        icon="bi bi-question-circle-fill"
                        href="/help"
                        title="Help"
                    />
                    <SideLink
                        icon="bi bi-gear-fill"
                        href="/setting"
                        title="Setting"
                    />
                    <SideLink
                        icon="bi bi-person-fill"
                        href="/account"
                        title="Account"
                    />
                </div>
            </div>
        </aside>
    );
}
