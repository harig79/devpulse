import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GitBranch, Code } from "lucide-react";
import Button from "../shared/Button";

const INITIAL = { github: "", leetcode: "" };
const INITIAL_ERRORS = { github: "", leetcode: "" };

function validate({ github, leetcode }) {
  const errors = { ...INITIAL_ERRORS };
  if (!github.trim()) {
    errors.github = "GitHub username is required.";
  } else if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/.test(github.trim())) {
    errors.github = "Enter a valid GitHub username.";
  }
  if (!leetcode.trim()) {
    errors.leetcode = "LeetCode username is required.";
  } else if (!/^[a-zA-Z0-9_-]{3,25}$/.test(leetcode.trim())) {
    errors.leetcode = "Enter a valid LeetCode username.";
  }
  return errors;
}

export default function SearchForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({ github: false, leetcode: false });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ github: true, leetcode: true });
    const errs = validate(values);
    setErrors(errs);
    if (errs.github || errs.leetcode) return;
    navigate(`/dashboard/${values.github.trim()}/${values.leetcode.trim()}`);
  }

  const inputBase = "w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-600";
  const inputNormal = "border-gray-200 dark:border-gray-700 focus:border-blue-400 focus:ring-1 focus:ring-blue-300 dark:focus:border-blue-500 dark:focus:ring-blue-800";
  const inputError  = "border-red-400 ring-1 ring-red-300 focus:ring-red-400";

  return (
    <section id="search" className="flex justify-center px-4 py-12 bg-white dark:bg-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1 text-center">
          Look up a Developer
        </h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mb-6">
          Try:{" "}
          <button
            type="button"
            onClick={() => setValues({ github: "COPILOT", leetcode: "LEETCODER" })}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            COPILOT / LEETCODER
          </button>
        </p>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          {/* GitHub */}
          <div className="flex flex-col gap-1">
            <label htmlFor="github" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <GitBranch size={15} className="text-gray-500 dark:text-gray-400" />
              GitHub Username
            </label>
            <input
              id="github" name="github" type="text" autoComplete="off"
              placeholder="e.g. COPILOT"
              value={values.github}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.github && touched.github ? inputError : inputNormal}`}
            />
            {errors.github && touched.github && (
              <p className="text-xs text-red-500 mt-0.5">{errors.github}</p>
            )}
          </div>

          {/* LeetCode */}
          <div className="flex flex-col gap-1">
            <label htmlFor="leetcode" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
              <Code size={15} className="text-gray-500 dark:text-gray-400" />
              LeetCode Username
            </label>
            <input
              id="leetcode" name="leetcode" type="text" autoComplete="off"
              placeholder="e.g. LEETCODER"
              value={values.leetcode}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputBase} ${errors.leetcode && touched.leetcode ? inputError : inputNormal}`}
            />
            {errors.leetcode && touched.leetcode && (
              <p className="text-xs text-red-500 mt-0.5">{errors.leetcode}</p>
            )}
          </div>

          <Button type="submit" size="lg" className="w-full mt-1">
            View Dashboard
          </Button>
        </form>
      </div>
    </section>
  );
}
