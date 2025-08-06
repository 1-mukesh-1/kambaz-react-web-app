const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Module() {
    const API = `${REMOTE_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-arrays">
            <h3>Module Implementation (On our own)</h3>
            <h4>Retrieving Object</h4>
            <a className="btn btn-primary" href={API}>
                Get Modules
            </a>
            <hr />
            <h4>Retrieving Names</h4>
            <a
                className="btn btn-primary"
                href={`${REMOTE_SERVER}/lab5/module/name`}
            >
                Get Name
            </a>
            <hr />
        </div>
    );
}