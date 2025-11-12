import { KNOWN_LABELS } from "../constants/KNOWN_LABELS";
import { formatDate } from "../functions/formatDate";
import { parseDate } from "../functions/parseDate";
import { sanitiseHtml } from "../functions/sanitiseHtml";
import { PostType } from "../types/PostType";
import { ValidatedPostType } from "../types/ValidatedPostType";

export const validatePost = ({
  created,
  description,
  image,
  keywords,
  labels,
  slug,
  title,
  updated,
  ...rest
}: Partial<PostType> & Pick<PostType, "slug">): ValidatedPostType => {
  if (!title) {
    throw new Error(`Cannot find title for post ${slug}`);
  }

  if (!description) {
    throw new Error(`Cannot find description for post ${slug}`);
  }

  if (!keywords) {
    throw new Error(`Cannot find keywords for post ${slug}`);
  }

  if (!Array.isArray(keywords)) {
    throw new Error(
      `Cannot use keywords: expected to have array but got ${typeof keywords}`
    );
  }

  if (!created) {
    throw new Error(`Cannot find created date for post ${slug}`);
  }

  if (!updated) {
    throw new Error(`Cannot find updated date for post ${slug}`);
  }

  if (!labels) {
    throw new Error(`Cannot find labels for post ${slug}`);
  }

  const labelsWithoutIcons = labels.filter(
    (label) => !KNOWN_LABELS.includes(label)
  );
  if (labelsWithoutIcons.length > 0) {
    throw new Error(`Cannot use labels without icons ${labelsWithoutIcons}`);
  }

  if (!image) {
    throw new Error(`Cannot find image for post ${slug}`);
  }

  return {
    created: formatDate(parseDate(created, slug)),
    description,
    image,
    keywords,
    labels,
    rawCreated: created,
    rawUpdated: updated,
    slug,
    title: sanitiseHtml(title),
    updated: formatDate(parseDate(updated, slug)),
    ...rest,
  };
};
