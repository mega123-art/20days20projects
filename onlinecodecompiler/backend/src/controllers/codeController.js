import { runcode } from "../sandbox/sandbox.js";
export const executeCode = async (req, res) => {
  const { sourceCode } = req.body;

  if (!sourceCode || typeof sourceCode !== "string") {
    return res.status(400).json({ error: "Invalid source code" });
  }

  try {
    const result = await runcode(sourceCode);

    return res.status(200).json({ status: "success", output: result });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
