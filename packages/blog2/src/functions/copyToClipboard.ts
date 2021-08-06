export const copyToClipboard = (content: string): boolean => {
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand(`copy`);
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
};
