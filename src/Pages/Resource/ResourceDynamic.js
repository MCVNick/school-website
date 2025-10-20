import { Suspense, useMemo, lazy } from "react";
import { useParams, useLocation } from "react-router-dom";

const modules = require.context("./", true, /\.jsx?$/);

export default function ResourceDynamic() {
  const { id, grade, subject, standard, file } = useParams();
  const location = useLocation();

  const relPath = useMemo(() => {
    if (id) return `./${id}.js`;

    return `./${grade}/${subject}/${standard}/${file}`;
  }, [id, grade, subject, standard, file]);

  const { LazyComp, notFound } = useMemo(() => {
    const keys = modules.keys();
    if (keys.includes(relPath)) {
      const Lazy = lazy(async () => modules(relPath));
      return { LazyComp: Lazy, notFound: null };
    }

    if (!relPath.endsWith(".js") && keys.includes(`${relPath}.js`)) {
      const Lazy = lazy(async () => modules(`${relPath}.js`));
      return { LazyComp: Lazy, notFound: null };
    }

    return { LazyComp: null, notFound: relPath };
  }, [relPath]);

  if (!LazyComp) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Resource not found</h2>
        <p>
          Looked for module: <code>{relPath.replace("./", "")}</code>
        </p>
        <p>Expected it to live here:</p>
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {`src/Pages/Resource/${
            id ? `${id}.js` : `${grade}/${subject}/${standard}/${file}`
          } `}
        </pre>
        <p>
          Make sure the file exists and <strong>default-exports</strong> a React
          component.
        </p>
        <small style={{ opacity: 0.7 }}>
          Current URL: <code>{location.pathname}</code>
        </small>
      </div>
    );
  }

  return (
    <Suspense fallback={<div style={{ padding: "2rem" }}>Loading…</div>}>
      <LazyComp />
    </Suspense>
  );
}
