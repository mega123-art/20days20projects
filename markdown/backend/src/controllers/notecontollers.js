import fs from "fs";
import { marked } from "marked";
import { Note } from "../models/notemodels.js";

export const savenote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const filecontent = fs.readFileSync(req.file.path, "utf8");
    const newnote = new Note({
      title: title || "undefined",
      content: filecontent,
    });
    await newnote.save();
    res.status(201).json({ message: "note saved successfully", note: newnote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const rendernote = async (req, res) => {
  try {
    const { content } = req.body;
    const htmlcontent = marked(content);
    res.status(200).json({ htmlcontent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const grammarcheck = async (req, res) => {
  try {
    const { content } = req.body;
    if(!content) {return res.status(400).json({erro:"content is required for grammar check"})}
    const apiURL="https://api.languagetool.org/v2/check"
    const params={
      text:content,
      language:"en-US"
    }
    const response =await axios.post(apiURL,null,{params})
    const matches=response.data.map((match)=>({
      message:match.message,
      shortMessage: match.shortMessage,
      offset: match.offset,
      length: match.length,
      replacements: match.replacements.map((r) => r.value)

    }))
    res.status(200).json({ content, errors:matches });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
