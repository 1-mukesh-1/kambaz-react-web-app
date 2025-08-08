const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Module() {
    const API = `${REMOTE_SERVER}/lab5/module`;
    return (
        <div id="wd-working-with-module">
            <h3>Module (On your Own)</h3>
            <h4>Retrieving Module Data</h4>
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
