const Item = ({ title, value }) => {
    return (
        <div className="flex items-center gap-8">
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-gray-800 text-sm">{value}</p>
        </div>
    );
};

export default function FileAndFolderDetails() {
    return (
        <div className="w-full sticky top-0 right-0 px-3">
            <div className="flex items-center justify-between mb-2">
                <h6 className="text-lg font-semibold">File Details</h6>
            </div>
            {/* image details */}
            <div className="w-full h-48 bg-gray-100 rounded-md mb-3">
                <img
                    src="https://images.unsplash.com/photo-1661961110671-77b71b929d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80https://unsplash.com/photos/1o5MZblCP50"
                    alt=""
                    className="w-full h-full object-cover rounded-md"
                />
            </div>

            {/* file details */}
            <h6 className="mb-3">Web Development.svg</h6>
            <div className="flex flex-col gap-y-2.5">
                <Item title="Type" value="Image" />
                <Item title="Size" value="61.5 MB" />
                <Item title="Owner" value="Andrea" />
                <Item title="Last Modified" value="March 25, 2022" />
            </div>
        </div>
    );
}
