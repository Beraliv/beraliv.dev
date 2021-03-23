import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any
}

export type Author = {
  __typename?: "Author"
  name?: Maybe<Scalars["String"]>
  summary?: Maybe<Scalars["String"]>
}

export type AuthorFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  summary?: Maybe<StringQueryOperatorInput>
}

export type AvifOptions = {
  quality?: Maybe<Scalars["Int"]>
  lossless?: Maybe<Scalars["Boolean"]>
  speed?: Maybe<Scalars["Int"]>
}

export type BlurredOptions = {
  /** Width of the generated low-res preview. Default is 20px */
  width?: Maybe<Scalars["Int"]>
  /**
   * Force the output format for the low-res preview. Default is to use the same
   * format as the input. You should rarely need to change this
   */
  toFormat?: Maybe<ImageFormat>
}

export type BooleanQueryOperatorInput = {
  eq?: Maybe<Scalars["Boolean"]>
  ne?: Maybe<Scalars["Boolean"]>
  in?: Maybe<Array<Maybe<Scalars["Boolean"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Boolean"]>>>
}

export type DateQueryOperatorInput = {
  eq?: Maybe<Scalars["Date"]>
  ne?: Maybe<Scalars["Date"]>
  gt?: Maybe<Scalars["Date"]>
  gte?: Maybe<Scalars["Date"]>
  lt?: Maybe<Scalars["Date"]>
  lte?: Maybe<Scalars["Date"]>
  in?: Maybe<Array<Maybe<Scalars["Date"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Date"]>>>
}

export type Directory = Node & {
  __typename?: "Directory"
  sourceInstanceName: Scalars["String"]
  absolutePath: Scalars["String"]
  relativePath: Scalars["String"]
  extension: Scalars["String"]
  size: Scalars["Int"]
  prettySize: Scalars["String"]
  modifiedTime: Scalars["Date"]
  accessTime: Scalars["Date"]
  changeTime: Scalars["Date"]
  birthTime: Scalars["Date"]
  root: Scalars["String"]
  dir: Scalars["String"]
  base: Scalars["String"]
  ext: Scalars["String"]
  name: Scalars["String"]
  relativeDirectory: Scalars["String"]
  dev: Scalars["Int"]
  mode: Scalars["Int"]
  nlink: Scalars["Int"]
  uid: Scalars["Int"]
  gid: Scalars["Int"]
  rdev: Scalars["Int"]
  ino: Scalars["Float"]
  atimeMs: Scalars["Float"]
  mtimeMs: Scalars["Float"]
  ctimeMs: Scalars["Float"]
  atime: Scalars["Date"]
  mtime: Scalars["Date"]
  ctime: Scalars["Date"]
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars["Date"]>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars["Float"]>
  blksize?: Maybe<Scalars["Int"]>
  blocks?: Maybe<Scalars["Int"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type DirectoryModifiedTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryAccessTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryChangeTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryBirthTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryAtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryMtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryCtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type DirectoryConnection = {
  __typename?: "DirectoryConnection"
  totalCount: Scalars["Int"]
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<DirectoryGroupConnection>
}

export type DirectoryConnectionDistinctArgs = {
  field: DirectoryFieldsEnum
}

export type DirectoryConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: DirectoryFieldsEnum
}

export type DirectoryEdge = {
  __typename?: "DirectoryEdge"
  next?: Maybe<Directory>
  node: Directory
  previous?: Maybe<Directory>
}

export enum DirectoryFieldsEnum {
  SourceInstanceName = "sourceInstanceName",
  AbsolutePath = "absolutePath",
  RelativePath = "relativePath",
  Extension = "extension",
  Size = "size",
  PrettySize = "prettySize",
  ModifiedTime = "modifiedTime",
  AccessTime = "accessTime",
  ChangeTime = "changeTime",
  BirthTime = "birthTime",
  Root = "root",
  Dir = "dir",
  Base = "base",
  Ext = "ext",
  Name = "name",
  RelativeDirectory = "relativeDirectory",
  Dev = "dev",
  Mode = "mode",
  Nlink = "nlink",
  Uid = "uid",
  Gid = "gid",
  Rdev = "rdev",
  Ino = "ino",
  AtimeMs = "atimeMs",
  MtimeMs = "mtimeMs",
  CtimeMs = "ctimeMs",
  Atime = "atime",
  Mtime = "mtime",
  Ctime = "ctime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type DirectoryFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type DirectoryGroupConnection = {
  __typename?: "DirectoryGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<DirectoryEdge>
  nodes: Array<Directory>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type DirectorySortInput = {
  fields?: Maybe<Array<Maybe<DirectoryFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type DuotoneGradient = {
  highlight: Scalars["String"]
  shadow: Scalars["String"]
  opacity?: Maybe<Scalars["Int"]>
}

export type Fields = {
  __typename?: "Fields"
  slug?: Maybe<Scalars["String"]>
}

export type FieldsFilterInput = {
  slug?: Maybe<StringQueryOperatorInput>
}

export type File = Node & {
  __typename?: "File"
  sourceInstanceName: Scalars["String"]
  absolutePath: Scalars["String"]
  relativePath: Scalars["String"]
  extension: Scalars["String"]
  size: Scalars["Int"]
  prettySize: Scalars["String"]
  modifiedTime: Scalars["Date"]
  accessTime: Scalars["Date"]
  changeTime: Scalars["Date"]
  birthTime: Scalars["Date"]
  root: Scalars["String"]
  dir: Scalars["String"]
  base: Scalars["String"]
  ext: Scalars["String"]
  name: Scalars["String"]
  relativeDirectory: Scalars["String"]
  dev: Scalars["Int"]
  mode: Scalars["Int"]
  nlink: Scalars["Int"]
  uid: Scalars["Int"]
  gid: Scalars["Int"]
  rdev: Scalars["Int"]
  ino: Scalars["Float"]
  atimeMs: Scalars["Float"]
  mtimeMs: Scalars["Float"]
  ctimeMs: Scalars["Float"]
  atime: Scalars["Date"]
  mtime: Scalars["Date"]
  ctime: Scalars["Date"]
  /** @deprecated Use `birthTime` instead */
  birthtime?: Maybe<Scalars["Date"]>
  /** @deprecated Use `birthTime` instead */
  birthtimeMs?: Maybe<Scalars["Float"]>
  blksize?: Maybe<Scalars["Int"]>
  blocks?: Maybe<Scalars["Int"]>
  /** Copy file to static directory and return public url to it */
  publicURL?: Maybe<Scalars["String"]>
  /** Returns all children nodes filtered by type MarkdownRemark */
  childrenMarkdownRemark?: Maybe<Array<Maybe<MarkdownRemark>>>
  /** Returns the first child node of type MarkdownRemark or null if there are no children of given type on this node */
  childMarkdownRemark?: Maybe<MarkdownRemark>
  /** Returns all children nodes filtered by type ImageSharp */
  childrenImageSharp?: Maybe<Array<Maybe<ImageSharp>>>
  /** Returns the first child node of type ImageSharp or null if there are no children of given type on this node */
  childImageSharp?: Maybe<ImageSharp>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type FileModifiedTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileAccessTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileChangeTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileBirthTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileAtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileMtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileCtimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FileConnection = {
  __typename?: "FileConnection"
  totalCount: Scalars["Int"]
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<FileGroupConnection>
}

export type FileConnectionDistinctArgs = {
  field: FileFieldsEnum
}

export type FileConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: FileFieldsEnum
}

export type FileEdge = {
  __typename?: "FileEdge"
  next?: Maybe<File>
  node: File
  previous?: Maybe<File>
}

export enum FileFieldsEnum {
  SourceInstanceName = "sourceInstanceName",
  AbsolutePath = "absolutePath",
  RelativePath = "relativePath",
  Extension = "extension",
  Size = "size",
  PrettySize = "prettySize",
  ModifiedTime = "modifiedTime",
  AccessTime = "accessTime",
  ChangeTime = "changeTime",
  BirthTime = "birthTime",
  Root = "root",
  Dir = "dir",
  Base = "base",
  Ext = "ext",
  Name = "name",
  RelativeDirectory = "relativeDirectory",
  Dev = "dev",
  Mode = "mode",
  Nlink = "nlink",
  Uid = "uid",
  Gid = "gid",
  Rdev = "rdev",
  Ino = "ino",
  AtimeMs = "atimeMs",
  MtimeMs = "mtimeMs",
  CtimeMs = "ctimeMs",
  Atime = "atime",
  Mtime = "mtime",
  Ctime = "ctime",
  Birthtime = "birthtime",
  BirthtimeMs = "birthtimeMs",
  Blksize = "blksize",
  Blocks = "blocks",
  PublicUrl = "publicURL",
  ChildrenMarkdownRemark = "childrenMarkdownRemark",
  ChildrenMarkdownRemarkId = "childrenMarkdownRemark___id",
  ChildrenMarkdownRemarkFrontmatterTitle = "childrenMarkdownRemark___frontmatter___title",
  ChildrenMarkdownRemarkFrontmatterDescription = "childrenMarkdownRemark___frontmatter___description",
  ChildrenMarkdownRemarkFrontmatterDate = "childrenMarkdownRemark___frontmatter___date",
  ChildrenMarkdownRemarkFrontmatterFeaturedSourceInstanceName = "childrenMarkdownRemark___frontmatter___featured___sourceInstanceName",
  ChildrenMarkdownRemarkFrontmatterFeaturedAbsolutePath = "childrenMarkdownRemark___frontmatter___featured___absolutePath",
  ChildrenMarkdownRemarkFrontmatterFeaturedRelativePath = "childrenMarkdownRemark___frontmatter___featured___relativePath",
  ChildrenMarkdownRemarkFrontmatterFeaturedExtension = "childrenMarkdownRemark___frontmatter___featured___extension",
  ChildrenMarkdownRemarkFrontmatterFeaturedSize = "childrenMarkdownRemark___frontmatter___featured___size",
  ChildrenMarkdownRemarkFrontmatterFeaturedPrettySize = "childrenMarkdownRemark___frontmatter___featured___prettySize",
  ChildrenMarkdownRemarkFrontmatterFeaturedModifiedTime = "childrenMarkdownRemark___frontmatter___featured___modifiedTime",
  ChildrenMarkdownRemarkFrontmatterFeaturedAccessTime = "childrenMarkdownRemark___frontmatter___featured___accessTime",
  ChildrenMarkdownRemarkFrontmatterFeaturedChangeTime = "childrenMarkdownRemark___frontmatter___featured___changeTime",
  ChildrenMarkdownRemarkFrontmatterFeaturedBirthTime = "childrenMarkdownRemark___frontmatter___featured___birthTime",
  ChildrenMarkdownRemarkFrontmatterFeaturedRoot = "childrenMarkdownRemark___frontmatter___featured___root",
  ChildrenMarkdownRemarkFrontmatterFeaturedDir = "childrenMarkdownRemark___frontmatter___featured___dir",
  ChildrenMarkdownRemarkFrontmatterFeaturedBase = "childrenMarkdownRemark___frontmatter___featured___base",
  ChildrenMarkdownRemarkFrontmatterFeaturedExt = "childrenMarkdownRemark___frontmatter___featured___ext",
  ChildrenMarkdownRemarkFrontmatterFeaturedName = "childrenMarkdownRemark___frontmatter___featured___name",
  ChildrenMarkdownRemarkFrontmatterFeaturedRelativeDirectory = "childrenMarkdownRemark___frontmatter___featured___relativeDirectory",
  ChildrenMarkdownRemarkFrontmatterFeaturedDev = "childrenMarkdownRemark___frontmatter___featured___dev",
  ChildrenMarkdownRemarkFrontmatterFeaturedMode = "childrenMarkdownRemark___frontmatter___featured___mode",
  ChildrenMarkdownRemarkFrontmatterFeaturedNlink = "childrenMarkdownRemark___frontmatter___featured___nlink",
  ChildrenMarkdownRemarkFrontmatterFeaturedUid = "childrenMarkdownRemark___frontmatter___featured___uid",
  ChildrenMarkdownRemarkFrontmatterFeaturedGid = "childrenMarkdownRemark___frontmatter___featured___gid",
  ChildrenMarkdownRemarkFrontmatterFeaturedRdev = "childrenMarkdownRemark___frontmatter___featured___rdev",
  ChildrenMarkdownRemarkFrontmatterFeaturedIno = "childrenMarkdownRemark___frontmatter___featured___ino",
  ChildrenMarkdownRemarkFrontmatterFeaturedAtimeMs = "childrenMarkdownRemark___frontmatter___featured___atimeMs",
  ChildrenMarkdownRemarkFrontmatterFeaturedMtimeMs = "childrenMarkdownRemark___frontmatter___featured___mtimeMs",
  ChildrenMarkdownRemarkFrontmatterFeaturedCtimeMs = "childrenMarkdownRemark___frontmatter___featured___ctimeMs",
  ChildrenMarkdownRemarkFrontmatterFeaturedAtime = "childrenMarkdownRemark___frontmatter___featured___atime",
  ChildrenMarkdownRemarkFrontmatterFeaturedMtime = "childrenMarkdownRemark___frontmatter___featured___mtime",
  ChildrenMarkdownRemarkFrontmatterFeaturedCtime = "childrenMarkdownRemark___frontmatter___featured___ctime",
  ChildrenMarkdownRemarkFrontmatterFeaturedBirthtime = "childrenMarkdownRemark___frontmatter___featured___birthtime",
  ChildrenMarkdownRemarkFrontmatterFeaturedBirthtimeMs = "childrenMarkdownRemark___frontmatter___featured___birthtimeMs",
  ChildrenMarkdownRemarkFrontmatterFeaturedBlksize = "childrenMarkdownRemark___frontmatter___featured___blksize",
  ChildrenMarkdownRemarkFrontmatterFeaturedBlocks = "childrenMarkdownRemark___frontmatter___featured___blocks",
  ChildrenMarkdownRemarkFrontmatterFeaturedPublicUrl = "childrenMarkdownRemark___frontmatter___featured___publicURL",
  ChildrenMarkdownRemarkFrontmatterFeaturedChildrenMarkdownRemark = "childrenMarkdownRemark___frontmatter___featured___childrenMarkdownRemark",
  ChildrenMarkdownRemarkFrontmatterFeaturedChildrenImageSharp = "childrenMarkdownRemark___frontmatter___featured___childrenImageSharp",
  ChildrenMarkdownRemarkFrontmatterFeaturedId = "childrenMarkdownRemark___frontmatter___featured___id",
  ChildrenMarkdownRemarkFrontmatterFeaturedChildren = "childrenMarkdownRemark___frontmatter___featured___children",
  ChildrenMarkdownRemarkFieldsSlug = "childrenMarkdownRemark___fields___slug",
  ChildrenMarkdownRemarkExcerpt = "childrenMarkdownRemark___excerpt",
  ChildrenMarkdownRemarkRawMarkdownBody = "childrenMarkdownRemark___rawMarkdownBody",
  ChildrenMarkdownRemarkFileAbsolutePath = "childrenMarkdownRemark___fileAbsolutePath",
  ChildrenMarkdownRemarkHtml = "childrenMarkdownRemark___html",
  ChildrenMarkdownRemarkHtmlAst = "childrenMarkdownRemark___htmlAst",
  ChildrenMarkdownRemarkExcerptAst = "childrenMarkdownRemark___excerptAst",
  ChildrenMarkdownRemarkHeadings = "childrenMarkdownRemark___headings",
  ChildrenMarkdownRemarkHeadingsId = "childrenMarkdownRemark___headings___id",
  ChildrenMarkdownRemarkHeadingsValue = "childrenMarkdownRemark___headings___value",
  ChildrenMarkdownRemarkHeadingsDepth = "childrenMarkdownRemark___headings___depth",
  ChildrenMarkdownRemarkTimeToRead = "childrenMarkdownRemark___timeToRead",
  ChildrenMarkdownRemarkTableOfContents = "childrenMarkdownRemark___tableOfContents",
  ChildrenMarkdownRemarkWordCountParagraphs = "childrenMarkdownRemark___wordCount___paragraphs",
  ChildrenMarkdownRemarkWordCountSentences = "childrenMarkdownRemark___wordCount___sentences",
  ChildrenMarkdownRemarkWordCountWords = "childrenMarkdownRemark___wordCount___words",
  ChildrenMarkdownRemarkParentId = "childrenMarkdownRemark___parent___id",
  ChildrenMarkdownRemarkParentParentId = "childrenMarkdownRemark___parent___parent___id",
  ChildrenMarkdownRemarkParentParentChildren = "childrenMarkdownRemark___parent___parent___children",
  ChildrenMarkdownRemarkParentChildren = "childrenMarkdownRemark___parent___children",
  ChildrenMarkdownRemarkParentChildrenId = "childrenMarkdownRemark___parent___children___id",
  ChildrenMarkdownRemarkParentChildrenChildren = "childrenMarkdownRemark___parent___children___children",
  ChildrenMarkdownRemarkParentInternalContent = "childrenMarkdownRemark___parent___internal___content",
  ChildrenMarkdownRemarkParentInternalContentDigest = "childrenMarkdownRemark___parent___internal___contentDigest",
  ChildrenMarkdownRemarkParentInternalDescription = "childrenMarkdownRemark___parent___internal___description",
  ChildrenMarkdownRemarkParentInternalFieldOwners = "childrenMarkdownRemark___parent___internal___fieldOwners",
  ChildrenMarkdownRemarkParentInternalIgnoreType = "childrenMarkdownRemark___parent___internal___ignoreType",
  ChildrenMarkdownRemarkParentInternalMediaType = "childrenMarkdownRemark___parent___internal___mediaType",
  ChildrenMarkdownRemarkParentInternalOwner = "childrenMarkdownRemark___parent___internal___owner",
  ChildrenMarkdownRemarkParentInternalType = "childrenMarkdownRemark___parent___internal___type",
  ChildrenMarkdownRemarkChildren = "childrenMarkdownRemark___children",
  ChildrenMarkdownRemarkChildrenId = "childrenMarkdownRemark___children___id",
  ChildrenMarkdownRemarkChildrenParentId = "childrenMarkdownRemark___children___parent___id",
  ChildrenMarkdownRemarkChildrenParentChildren = "childrenMarkdownRemark___children___parent___children",
  ChildrenMarkdownRemarkChildrenChildren = "childrenMarkdownRemark___children___children",
  ChildrenMarkdownRemarkChildrenChildrenId = "childrenMarkdownRemark___children___children___id",
  ChildrenMarkdownRemarkChildrenChildrenChildren = "childrenMarkdownRemark___children___children___children",
  ChildrenMarkdownRemarkChildrenInternalContent = "childrenMarkdownRemark___children___internal___content",
  ChildrenMarkdownRemarkChildrenInternalContentDigest = "childrenMarkdownRemark___children___internal___contentDigest",
  ChildrenMarkdownRemarkChildrenInternalDescription = "childrenMarkdownRemark___children___internal___description",
  ChildrenMarkdownRemarkChildrenInternalFieldOwners = "childrenMarkdownRemark___children___internal___fieldOwners",
  ChildrenMarkdownRemarkChildrenInternalIgnoreType = "childrenMarkdownRemark___children___internal___ignoreType",
  ChildrenMarkdownRemarkChildrenInternalMediaType = "childrenMarkdownRemark___children___internal___mediaType",
  ChildrenMarkdownRemarkChildrenInternalOwner = "childrenMarkdownRemark___children___internal___owner",
  ChildrenMarkdownRemarkChildrenInternalType = "childrenMarkdownRemark___children___internal___type",
  ChildrenMarkdownRemarkInternalContent = "childrenMarkdownRemark___internal___content",
  ChildrenMarkdownRemarkInternalContentDigest = "childrenMarkdownRemark___internal___contentDigest",
  ChildrenMarkdownRemarkInternalDescription = "childrenMarkdownRemark___internal___description",
  ChildrenMarkdownRemarkInternalFieldOwners = "childrenMarkdownRemark___internal___fieldOwners",
  ChildrenMarkdownRemarkInternalIgnoreType = "childrenMarkdownRemark___internal___ignoreType",
  ChildrenMarkdownRemarkInternalMediaType = "childrenMarkdownRemark___internal___mediaType",
  ChildrenMarkdownRemarkInternalOwner = "childrenMarkdownRemark___internal___owner",
  ChildrenMarkdownRemarkInternalType = "childrenMarkdownRemark___internal___type",
  ChildMarkdownRemarkId = "childMarkdownRemark___id",
  ChildMarkdownRemarkFrontmatterTitle = "childMarkdownRemark___frontmatter___title",
  ChildMarkdownRemarkFrontmatterDescription = "childMarkdownRemark___frontmatter___description",
  ChildMarkdownRemarkFrontmatterDate = "childMarkdownRemark___frontmatter___date",
  ChildMarkdownRemarkFrontmatterFeaturedSourceInstanceName = "childMarkdownRemark___frontmatter___featured___sourceInstanceName",
  ChildMarkdownRemarkFrontmatterFeaturedAbsolutePath = "childMarkdownRemark___frontmatter___featured___absolutePath",
  ChildMarkdownRemarkFrontmatterFeaturedRelativePath = "childMarkdownRemark___frontmatter___featured___relativePath",
  ChildMarkdownRemarkFrontmatterFeaturedExtension = "childMarkdownRemark___frontmatter___featured___extension",
  ChildMarkdownRemarkFrontmatterFeaturedSize = "childMarkdownRemark___frontmatter___featured___size",
  ChildMarkdownRemarkFrontmatterFeaturedPrettySize = "childMarkdownRemark___frontmatter___featured___prettySize",
  ChildMarkdownRemarkFrontmatterFeaturedModifiedTime = "childMarkdownRemark___frontmatter___featured___modifiedTime",
  ChildMarkdownRemarkFrontmatterFeaturedAccessTime = "childMarkdownRemark___frontmatter___featured___accessTime",
  ChildMarkdownRemarkFrontmatterFeaturedChangeTime = "childMarkdownRemark___frontmatter___featured___changeTime",
  ChildMarkdownRemarkFrontmatterFeaturedBirthTime = "childMarkdownRemark___frontmatter___featured___birthTime",
  ChildMarkdownRemarkFrontmatterFeaturedRoot = "childMarkdownRemark___frontmatter___featured___root",
  ChildMarkdownRemarkFrontmatterFeaturedDir = "childMarkdownRemark___frontmatter___featured___dir",
  ChildMarkdownRemarkFrontmatterFeaturedBase = "childMarkdownRemark___frontmatter___featured___base",
  ChildMarkdownRemarkFrontmatterFeaturedExt = "childMarkdownRemark___frontmatter___featured___ext",
  ChildMarkdownRemarkFrontmatterFeaturedName = "childMarkdownRemark___frontmatter___featured___name",
  ChildMarkdownRemarkFrontmatterFeaturedRelativeDirectory = "childMarkdownRemark___frontmatter___featured___relativeDirectory",
  ChildMarkdownRemarkFrontmatterFeaturedDev = "childMarkdownRemark___frontmatter___featured___dev",
  ChildMarkdownRemarkFrontmatterFeaturedMode = "childMarkdownRemark___frontmatter___featured___mode",
  ChildMarkdownRemarkFrontmatterFeaturedNlink = "childMarkdownRemark___frontmatter___featured___nlink",
  ChildMarkdownRemarkFrontmatterFeaturedUid = "childMarkdownRemark___frontmatter___featured___uid",
  ChildMarkdownRemarkFrontmatterFeaturedGid = "childMarkdownRemark___frontmatter___featured___gid",
  ChildMarkdownRemarkFrontmatterFeaturedRdev = "childMarkdownRemark___frontmatter___featured___rdev",
  ChildMarkdownRemarkFrontmatterFeaturedIno = "childMarkdownRemark___frontmatter___featured___ino",
  ChildMarkdownRemarkFrontmatterFeaturedAtimeMs = "childMarkdownRemark___frontmatter___featured___atimeMs",
  ChildMarkdownRemarkFrontmatterFeaturedMtimeMs = "childMarkdownRemark___frontmatter___featured___mtimeMs",
  ChildMarkdownRemarkFrontmatterFeaturedCtimeMs = "childMarkdownRemark___frontmatter___featured___ctimeMs",
  ChildMarkdownRemarkFrontmatterFeaturedAtime = "childMarkdownRemark___frontmatter___featured___atime",
  ChildMarkdownRemarkFrontmatterFeaturedMtime = "childMarkdownRemark___frontmatter___featured___mtime",
  ChildMarkdownRemarkFrontmatterFeaturedCtime = "childMarkdownRemark___frontmatter___featured___ctime",
  ChildMarkdownRemarkFrontmatterFeaturedBirthtime = "childMarkdownRemark___frontmatter___featured___birthtime",
  ChildMarkdownRemarkFrontmatterFeaturedBirthtimeMs = "childMarkdownRemark___frontmatter___featured___birthtimeMs",
  ChildMarkdownRemarkFrontmatterFeaturedBlksize = "childMarkdownRemark___frontmatter___featured___blksize",
  ChildMarkdownRemarkFrontmatterFeaturedBlocks = "childMarkdownRemark___frontmatter___featured___blocks",
  ChildMarkdownRemarkFrontmatterFeaturedPublicUrl = "childMarkdownRemark___frontmatter___featured___publicURL",
  ChildMarkdownRemarkFrontmatterFeaturedChildrenMarkdownRemark = "childMarkdownRemark___frontmatter___featured___childrenMarkdownRemark",
  ChildMarkdownRemarkFrontmatterFeaturedChildrenImageSharp = "childMarkdownRemark___frontmatter___featured___childrenImageSharp",
  ChildMarkdownRemarkFrontmatterFeaturedId = "childMarkdownRemark___frontmatter___featured___id",
  ChildMarkdownRemarkFrontmatterFeaturedChildren = "childMarkdownRemark___frontmatter___featured___children",
  ChildMarkdownRemarkFieldsSlug = "childMarkdownRemark___fields___slug",
  ChildMarkdownRemarkExcerpt = "childMarkdownRemark___excerpt",
  ChildMarkdownRemarkRawMarkdownBody = "childMarkdownRemark___rawMarkdownBody",
  ChildMarkdownRemarkFileAbsolutePath = "childMarkdownRemark___fileAbsolutePath",
  ChildMarkdownRemarkHtml = "childMarkdownRemark___html",
  ChildMarkdownRemarkHtmlAst = "childMarkdownRemark___htmlAst",
  ChildMarkdownRemarkExcerptAst = "childMarkdownRemark___excerptAst",
  ChildMarkdownRemarkHeadings = "childMarkdownRemark___headings",
  ChildMarkdownRemarkHeadingsId = "childMarkdownRemark___headings___id",
  ChildMarkdownRemarkHeadingsValue = "childMarkdownRemark___headings___value",
  ChildMarkdownRemarkHeadingsDepth = "childMarkdownRemark___headings___depth",
  ChildMarkdownRemarkTimeToRead = "childMarkdownRemark___timeToRead",
  ChildMarkdownRemarkTableOfContents = "childMarkdownRemark___tableOfContents",
  ChildMarkdownRemarkWordCountParagraphs = "childMarkdownRemark___wordCount___paragraphs",
  ChildMarkdownRemarkWordCountSentences = "childMarkdownRemark___wordCount___sentences",
  ChildMarkdownRemarkWordCountWords = "childMarkdownRemark___wordCount___words",
  ChildMarkdownRemarkParentId = "childMarkdownRemark___parent___id",
  ChildMarkdownRemarkParentParentId = "childMarkdownRemark___parent___parent___id",
  ChildMarkdownRemarkParentParentChildren = "childMarkdownRemark___parent___parent___children",
  ChildMarkdownRemarkParentChildren = "childMarkdownRemark___parent___children",
  ChildMarkdownRemarkParentChildrenId = "childMarkdownRemark___parent___children___id",
  ChildMarkdownRemarkParentChildrenChildren = "childMarkdownRemark___parent___children___children",
  ChildMarkdownRemarkParentInternalContent = "childMarkdownRemark___parent___internal___content",
  ChildMarkdownRemarkParentInternalContentDigest = "childMarkdownRemark___parent___internal___contentDigest",
  ChildMarkdownRemarkParentInternalDescription = "childMarkdownRemark___parent___internal___description",
  ChildMarkdownRemarkParentInternalFieldOwners = "childMarkdownRemark___parent___internal___fieldOwners",
  ChildMarkdownRemarkParentInternalIgnoreType = "childMarkdownRemark___parent___internal___ignoreType",
  ChildMarkdownRemarkParentInternalMediaType = "childMarkdownRemark___parent___internal___mediaType",
  ChildMarkdownRemarkParentInternalOwner = "childMarkdownRemark___parent___internal___owner",
  ChildMarkdownRemarkParentInternalType = "childMarkdownRemark___parent___internal___type",
  ChildMarkdownRemarkChildren = "childMarkdownRemark___children",
  ChildMarkdownRemarkChildrenId = "childMarkdownRemark___children___id",
  ChildMarkdownRemarkChildrenParentId = "childMarkdownRemark___children___parent___id",
  ChildMarkdownRemarkChildrenParentChildren = "childMarkdownRemark___children___parent___children",
  ChildMarkdownRemarkChildrenChildren = "childMarkdownRemark___children___children",
  ChildMarkdownRemarkChildrenChildrenId = "childMarkdownRemark___children___children___id",
  ChildMarkdownRemarkChildrenChildrenChildren = "childMarkdownRemark___children___children___children",
  ChildMarkdownRemarkChildrenInternalContent = "childMarkdownRemark___children___internal___content",
  ChildMarkdownRemarkChildrenInternalContentDigest = "childMarkdownRemark___children___internal___contentDigest",
  ChildMarkdownRemarkChildrenInternalDescription = "childMarkdownRemark___children___internal___description",
  ChildMarkdownRemarkChildrenInternalFieldOwners = "childMarkdownRemark___children___internal___fieldOwners",
  ChildMarkdownRemarkChildrenInternalIgnoreType = "childMarkdownRemark___children___internal___ignoreType",
  ChildMarkdownRemarkChildrenInternalMediaType = "childMarkdownRemark___children___internal___mediaType",
  ChildMarkdownRemarkChildrenInternalOwner = "childMarkdownRemark___children___internal___owner",
  ChildMarkdownRemarkChildrenInternalType = "childMarkdownRemark___children___internal___type",
  ChildMarkdownRemarkInternalContent = "childMarkdownRemark___internal___content",
  ChildMarkdownRemarkInternalContentDigest = "childMarkdownRemark___internal___contentDigest",
  ChildMarkdownRemarkInternalDescription = "childMarkdownRemark___internal___description",
  ChildMarkdownRemarkInternalFieldOwners = "childMarkdownRemark___internal___fieldOwners",
  ChildMarkdownRemarkInternalIgnoreType = "childMarkdownRemark___internal___ignoreType",
  ChildMarkdownRemarkInternalMediaType = "childMarkdownRemark___internal___mediaType",
  ChildMarkdownRemarkInternalOwner = "childMarkdownRemark___internal___owner",
  ChildMarkdownRemarkInternalType = "childMarkdownRemark___internal___type",
  ChildrenImageSharp = "childrenImageSharp",
  ChildrenImageSharpFixedBase64 = "childrenImageSharp___fixed___base64",
  ChildrenImageSharpFixedTracedSvg = "childrenImageSharp___fixed___tracedSVG",
  ChildrenImageSharpFixedAspectRatio = "childrenImageSharp___fixed___aspectRatio",
  ChildrenImageSharpFixedWidth = "childrenImageSharp___fixed___width",
  ChildrenImageSharpFixedHeight = "childrenImageSharp___fixed___height",
  ChildrenImageSharpFixedSrc = "childrenImageSharp___fixed___src",
  ChildrenImageSharpFixedSrcSet = "childrenImageSharp___fixed___srcSet",
  ChildrenImageSharpFixedSrcWebp = "childrenImageSharp___fixed___srcWebp",
  ChildrenImageSharpFixedSrcSetWebp = "childrenImageSharp___fixed___srcSetWebp",
  ChildrenImageSharpFixedOriginalName = "childrenImageSharp___fixed___originalName",
  ChildrenImageSharpResolutionsBase64 = "childrenImageSharp___resolutions___base64",
  ChildrenImageSharpResolutionsTracedSvg = "childrenImageSharp___resolutions___tracedSVG",
  ChildrenImageSharpResolutionsAspectRatio = "childrenImageSharp___resolutions___aspectRatio",
  ChildrenImageSharpResolutionsWidth = "childrenImageSharp___resolutions___width",
  ChildrenImageSharpResolutionsHeight = "childrenImageSharp___resolutions___height",
  ChildrenImageSharpResolutionsSrc = "childrenImageSharp___resolutions___src",
  ChildrenImageSharpResolutionsSrcSet = "childrenImageSharp___resolutions___srcSet",
  ChildrenImageSharpResolutionsSrcWebp = "childrenImageSharp___resolutions___srcWebp",
  ChildrenImageSharpResolutionsSrcSetWebp = "childrenImageSharp___resolutions___srcSetWebp",
  ChildrenImageSharpResolutionsOriginalName = "childrenImageSharp___resolutions___originalName",
  ChildrenImageSharpFluidBase64 = "childrenImageSharp___fluid___base64",
  ChildrenImageSharpFluidTracedSvg = "childrenImageSharp___fluid___tracedSVG",
  ChildrenImageSharpFluidAspectRatio = "childrenImageSharp___fluid___aspectRatio",
  ChildrenImageSharpFluidSrc = "childrenImageSharp___fluid___src",
  ChildrenImageSharpFluidSrcSet = "childrenImageSharp___fluid___srcSet",
  ChildrenImageSharpFluidSrcWebp = "childrenImageSharp___fluid___srcWebp",
  ChildrenImageSharpFluidSrcSetWebp = "childrenImageSharp___fluid___srcSetWebp",
  ChildrenImageSharpFluidSizes = "childrenImageSharp___fluid___sizes",
  ChildrenImageSharpFluidOriginalImg = "childrenImageSharp___fluid___originalImg",
  ChildrenImageSharpFluidOriginalName = "childrenImageSharp___fluid___originalName",
  ChildrenImageSharpFluidPresentationWidth = "childrenImageSharp___fluid___presentationWidth",
  ChildrenImageSharpFluidPresentationHeight = "childrenImageSharp___fluid___presentationHeight",
  ChildrenImageSharpSizesBase64 = "childrenImageSharp___sizes___base64",
  ChildrenImageSharpSizesTracedSvg = "childrenImageSharp___sizes___tracedSVG",
  ChildrenImageSharpSizesAspectRatio = "childrenImageSharp___sizes___aspectRatio",
  ChildrenImageSharpSizesSrc = "childrenImageSharp___sizes___src",
  ChildrenImageSharpSizesSrcSet = "childrenImageSharp___sizes___srcSet",
  ChildrenImageSharpSizesSrcWebp = "childrenImageSharp___sizes___srcWebp",
  ChildrenImageSharpSizesSrcSetWebp = "childrenImageSharp___sizes___srcSetWebp",
  ChildrenImageSharpSizesSizes = "childrenImageSharp___sizes___sizes",
  ChildrenImageSharpSizesOriginalImg = "childrenImageSharp___sizes___originalImg",
  ChildrenImageSharpSizesOriginalName = "childrenImageSharp___sizes___originalName",
  ChildrenImageSharpSizesPresentationWidth = "childrenImageSharp___sizes___presentationWidth",
  ChildrenImageSharpSizesPresentationHeight = "childrenImageSharp___sizes___presentationHeight",
  ChildrenImageSharpGatsbyImageData = "childrenImageSharp___gatsbyImageData",
  ChildrenImageSharpOriginalWidth = "childrenImageSharp___original___width",
  ChildrenImageSharpOriginalHeight = "childrenImageSharp___original___height",
  ChildrenImageSharpOriginalSrc = "childrenImageSharp___original___src",
  ChildrenImageSharpResizeSrc = "childrenImageSharp___resize___src",
  ChildrenImageSharpResizeTracedSvg = "childrenImageSharp___resize___tracedSVG",
  ChildrenImageSharpResizeWidth = "childrenImageSharp___resize___width",
  ChildrenImageSharpResizeHeight = "childrenImageSharp___resize___height",
  ChildrenImageSharpResizeAspectRatio = "childrenImageSharp___resize___aspectRatio",
  ChildrenImageSharpResizeOriginalName = "childrenImageSharp___resize___originalName",
  ChildrenImageSharpId = "childrenImageSharp___id",
  ChildrenImageSharpParentId = "childrenImageSharp___parent___id",
  ChildrenImageSharpParentParentId = "childrenImageSharp___parent___parent___id",
  ChildrenImageSharpParentParentChildren = "childrenImageSharp___parent___parent___children",
  ChildrenImageSharpParentChildren = "childrenImageSharp___parent___children",
  ChildrenImageSharpParentChildrenId = "childrenImageSharp___parent___children___id",
  ChildrenImageSharpParentChildrenChildren = "childrenImageSharp___parent___children___children",
  ChildrenImageSharpParentInternalContent = "childrenImageSharp___parent___internal___content",
  ChildrenImageSharpParentInternalContentDigest = "childrenImageSharp___parent___internal___contentDigest",
  ChildrenImageSharpParentInternalDescription = "childrenImageSharp___parent___internal___description",
  ChildrenImageSharpParentInternalFieldOwners = "childrenImageSharp___parent___internal___fieldOwners",
  ChildrenImageSharpParentInternalIgnoreType = "childrenImageSharp___parent___internal___ignoreType",
  ChildrenImageSharpParentInternalMediaType = "childrenImageSharp___parent___internal___mediaType",
  ChildrenImageSharpParentInternalOwner = "childrenImageSharp___parent___internal___owner",
  ChildrenImageSharpParentInternalType = "childrenImageSharp___parent___internal___type",
  ChildrenImageSharpChildren = "childrenImageSharp___children",
  ChildrenImageSharpChildrenId = "childrenImageSharp___children___id",
  ChildrenImageSharpChildrenParentId = "childrenImageSharp___children___parent___id",
  ChildrenImageSharpChildrenParentChildren = "childrenImageSharp___children___parent___children",
  ChildrenImageSharpChildrenChildren = "childrenImageSharp___children___children",
  ChildrenImageSharpChildrenChildrenId = "childrenImageSharp___children___children___id",
  ChildrenImageSharpChildrenChildrenChildren = "childrenImageSharp___children___children___children",
  ChildrenImageSharpChildrenInternalContent = "childrenImageSharp___children___internal___content",
  ChildrenImageSharpChildrenInternalContentDigest = "childrenImageSharp___children___internal___contentDigest",
  ChildrenImageSharpChildrenInternalDescription = "childrenImageSharp___children___internal___description",
  ChildrenImageSharpChildrenInternalFieldOwners = "childrenImageSharp___children___internal___fieldOwners",
  ChildrenImageSharpChildrenInternalIgnoreType = "childrenImageSharp___children___internal___ignoreType",
  ChildrenImageSharpChildrenInternalMediaType = "childrenImageSharp___children___internal___mediaType",
  ChildrenImageSharpChildrenInternalOwner = "childrenImageSharp___children___internal___owner",
  ChildrenImageSharpChildrenInternalType = "childrenImageSharp___children___internal___type",
  ChildrenImageSharpInternalContent = "childrenImageSharp___internal___content",
  ChildrenImageSharpInternalContentDigest = "childrenImageSharp___internal___contentDigest",
  ChildrenImageSharpInternalDescription = "childrenImageSharp___internal___description",
  ChildrenImageSharpInternalFieldOwners = "childrenImageSharp___internal___fieldOwners",
  ChildrenImageSharpInternalIgnoreType = "childrenImageSharp___internal___ignoreType",
  ChildrenImageSharpInternalMediaType = "childrenImageSharp___internal___mediaType",
  ChildrenImageSharpInternalOwner = "childrenImageSharp___internal___owner",
  ChildrenImageSharpInternalType = "childrenImageSharp___internal___type",
  ChildImageSharpFixedBase64 = "childImageSharp___fixed___base64",
  ChildImageSharpFixedTracedSvg = "childImageSharp___fixed___tracedSVG",
  ChildImageSharpFixedAspectRatio = "childImageSharp___fixed___aspectRatio",
  ChildImageSharpFixedWidth = "childImageSharp___fixed___width",
  ChildImageSharpFixedHeight = "childImageSharp___fixed___height",
  ChildImageSharpFixedSrc = "childImageSharp___fixed___src",
  ChildImageSharpFixedSrcSet = "childImageSharp___fixed___srcSet",
  ChildImageSharpFixedSrcWebp = "childImageSharp___fixed___srcWebp",
  ChildImageSharpFixedSrcSetWebp = "childImageSharp___fixed___srcSetWebp",
  ChildImageSharpFixedOriginalName = "childImageSharp___fixed___originalName",
  ChildImageSharpResolutionsBase64 = "childImageSharp___resolutions___base64",
  ChildImageSharpResolutionsTracedSvg = "childImageSharp___resolutions___tracedSVG",
  ChildImageSharpResolutionsAspectRatio = "childImageSharp___resolutions___aspectRatio",
  ChildImageSharpResolutionsWidth = "childImageSharp___resolutions___width",
  ChildImageSharpResolutionsHeight = "childImageSharp___resolutions___height",
  ChildImageSharpResolutionsSrc = "childImageSharp___resolutions___src",
  ChildImageSharpResolutionsSrcSet = "childImageSharp___resolutions___srcSet",
  ChildImageSharpResolutionsSrcWebp = "childImageSharp___resolutions___srcWebp",
  ChildImageSharpResolutionsSrcSetWebp = "childImageSharp___resolutions___srcSetWebp",
  ChildImageSharpResolutionsOriginalName = "childImageSharp___resolutions___originalName",
  ChildImageSharpFluidBase64 = "childImageSharp___fluid___base64",
  ChildImageSharpFluidTracedSvg = "childImageSharp___fluid___tracedSVG",
  ChildImageSharpFluidAspectRatio = "childImageSharp___fluid___aspectRatio",
  ChildImageSharpFluidSrc = "childImageSharp___fluid___src",
  ChildImageSharpFluidSrcSet = "childImageSharp___fluid___srcSet",
  ChildImageSharpFluidSrcWebp = "childImageSharp___fluid___srcWebp",
  ChildImageSharpFluidSrcSetWebp = "childImageSharp___fluid___srcSetWebp",
  ChildImageSharpFluidSizes = "childImageSharp___fluid___sizes",
  ChildImageSharpFluidOriginalImg = "childImageSharp___fluid___originalImg",
  ChildImageSharpFluidOriginalName = "childImageSharp___fluid___originalName",
  ChildImageSharpFluidPresentationWidth = "childImageSharp___fluid___presentationWidth",
  ChildImageSharpFluidPresentationHeight = "childImageSharp___fluid___presentationHeight",
  ChildImageSharpSizesBase64 = "childImageSharp___sizes___base64",
  ChildImageSharpSizesTracedSvg = "childImageSharp___sizes___tracedSVG",
  ChildImageSharpSizesAspectRatio = "childImageSharp___sizes___aspectRatio",
  ChildImageSharpSizesSrc = "childImageSharp___sizes___src",
  ChildImageSharpSizesSrcSet = "childImageSharp___sizes___srcSet",
  ChildImageSharpSizesSrcWebp = "childImageSharp___sizes___srcWebp",
  ChildImageSharpSizesSrcSetWebp = "childImageSharp___sizes___srcSetWebp",
  ChildImageSharpSizesSizes = "childImageSharp___sizes___sizes",
  ChildImageSharpSizesOriginalImg = "childImageSharp___sizes___originalImg",
  ChildImageSharpSizesOriginalName = "childImageSharp___sizes___originalName",
  ChildImageSharpSizesPresentationWidth = "childImageSharp___sizes___presentationWidth",
  ChildImageSharpSizesPresentationHeight = "childImageSharp___sizes___presentationHeight",
  ChildImageSharpGatsbyImageData = "childImageSharp___gatsbyImageData",
  ChildImageSharpOriginalWidth = "childImageSharp___original___width",
  ChildImageSharpOriginalHeight = "childImageSharp___original___height",
  ChildImageSharpOriginalSrc = "childImageSharp___original___src",
  ChildImageSharpResizeSrc = "childImageSharp___resize___src",
  ChildImageSharpResizeTracedSvg = "childImageSharp___resize___tracedSVG",
  ChildImageSharpResizeWidth = "childImageSharp___resize___width",
  ChildImageSharpResizeHeight = "childImageSharp___resize___height",
  ChildImageSharpResizeAspectRatio = "childImageSharp___resize___aspectRatio",
  ChildImageSharpResizeOriginalName = "childImageSharp___resize___originalName",
  ChildImageSharpId = "childImageSharp___id",
  ChildImageSharpParentId = "childImageSharp___parent___id",
  ChildImageSharpParentParentId = "childImageSharp___parent___parent___id",
  ChildImageSharpParentParentChildren = "childImageSharp___parent___parent___children",
  ChildImageSharpParentChildren = "childImageSharp___parent___children",
  ChildImageSharpParentChildrenId = "childImageSharp___parent___children___id",
  ChildImageSharpParentChildrenChildren = "childImageSharp___parent___children___children",
  ChildImageSharpParentInternalContent = "childImageSharp___parent___internal___content",
  ChildImageSharpParentInternalContentDigest = "childImageSharp___parent___internal___contentDigest",
  ChildImageSharpParentInternalDescription = "childImageSharp___parent___internal___description",
  ChildImageSharpParentInternalFieldOwners = "childImageSharp___parent___internal___fieldOwners",
  ChildImageSharpParentInternalIgnoreType = "childImageSharp___parent___internal___ignoreType",
  ChildImageSharpParentInternalMediaType = "childImageSharp___parent___internal___mediaType",
  ChildImageSharpParentInternalOwner = "childImageSharp___parent___internal___owner",
  ChildImageSharpParentInternalType = "childImageSharp___parent___internal___type",
  ChildImageSharpChildren = "childImageSharp___children",
  ChildImageSharpChildrenId = "childImageSharp___children___id",
  ChildImageSharpChildrenParentId = "childImageSharp___children___parent___id",
  ChildImageSharpChildrenParentChildren = "childImageSharp___children___parent___children",
  ChildImageSharpChildrenChildren = "childImageSharp___children___children",
  ChildImageSharpChildrenChildrenId = "childImageSharp___children___children___id",
  ChildImageSharpChildrenChildrenChildren = "childImageSharp___children___children___children",
  ChildImageSharpChildrenInternalContent = "childImageSharp___children___internal___content",
  ChildImageSharpChildrenInternalContentDigest = "childImageSharp___children___internal___contentDigest",
  ChildImageSharpChildrenInternalDescription = "childImageSharp___children___internal___description",
  ChildImageSharpChildrenInternalFieldOwners = "childImageSharp___children___internal___fieldOwners",
  ChildImageSharpChildrenInternalIgnoreType = "childImageSharp___children___internal___ignoreType",
  ChildImageSharpChildrenInternalMediaType = "childImageSharp___children___internal___mediaType",
  ChildImageSharpChildrenInternalOwner = "childImageSharp___children___internal___owner",
  ChildImageSharpChildrenInternalType = "childImageSharp___children___internal___type",
  ChildImageSharpInternalContent = "childImageSharp___internal___content",
  ChildImageSharpInternalContentDigest = "childImageSharp___internal___contentDigest",
  ChildImageSharpInternalDescription = "childImageSharp___internal___description",
  ChildImageSharpInternalFieldOwners = "childImageSharp___internal___fieldOwners",
  ChildImageSharpInternalIgnoreType = "childImageSharp___internal___ignoreType",
  ChildImageSharpInternalMediaType = "childImageSharp___internal___mediaType",
  ChildImageSharpInternalOwner = "childImageSharp___internal___owner",
  ChildImageSharpInternalType = "childImageSharp___internal___type",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type FileFilterInput = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  publicURL?: Maybe<StringQueryOperatorInput>
  childrenMarkdownRemark?: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark?: Maybe<MarkdownRemarkFilterInput>
  childrenImageSharp?: Maybe<ImageSharpFilterListInput>
  childImageSharp?: Maybe<ImageSharpFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type FileGroupConnection = {
  __typename?: "FileGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<FileEdge>
  nodes: Array<File>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type FileSortInput = {
  fields?: Maybe<Array<Maybe<FileFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type FloatQueryOperatorInput = {
  eq?: Maybe<Scalars["Float"]>
  ne?: Maybe<Scalars["Float"]>
  gt?: Maybe<Scalars["Float"]>
  gte?: Maybe<Scalars["Float"]>
  lt?: Maybe<Scalars["Float"]>
  lte?: Maybe<Scalars["Float"]>
  in?: Maybe<Array<Maybe<Scalars["Float"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Float"]>>>
}

export type Frontmatter = {
  __typename?: "Frontmatter"
  title?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  date?: Maybe<Scalars["Date"]>
  featured?: Maybe<File>
}

export type FrontmatterDateArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type FrontmatterFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  date?: Maybe<DateQueryOperatorInput>
  featured?: Maybe<FileFilterInput>
}

export type GrvscCodeBlock = Node & {
  __typename?: "GRVSCCodeBlock"
  index: Scalars["Int"]
  html: Scalars["String"]
  text: Scalars["String"]
  preClassName: Scalars["String"]
  codeClassName: Scalars["String"]
  language?: Maybe<Scalars["String"]>
  meta?: Maybe<Scalars["JSON"]>
  defaultTheme: GrvscTheme
  additionalThemes: Array<GrvscTheme>
  tokenizedLines?: Maybe<Array<GrvscTokenizedLine>>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type GrvscCodeBlockConnection = {
  __typename?: "GRVSCCodeBlockConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscCodeBlockEdge>
  nodes: Array<GrvscCodeBlock>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<GrvscCodeBlockGroupConnection>
}

export type GrvscCodeBlockConnectionDistinctArgs = {
  field: GrvscCodeBlockFieldsEnum
}

export type GrvscCodeBlockConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: GrvscCodeBlockFieldsEnum
}

export type GrvscCodeBlockEdge = {
  __typename?: "GRVSCCodeBlockEdge"
  next?: Maybe<GrvscCodeBlock>
  node: GrvscCodeBlock
  previous?: Maybe<GrvscCodeBlock>
}

export enum GrvscCodeBlockFieldsEnum {
  Index = "index",
  Html = "html",
  Text = "text",
  PreClassName = "preClassName",
  CodeClassName = "codeClassName",
  Language = "language",
  Meta = "meta",
  DefaultThemePath = "defaultTheme___path",
  DefaultThemeIdentifier = "defaultTheme___identifier",
  DefaultThemeConditions = "defaultTheme___conditions",
  DefaultThemeConditionsCondition = "defaultTheme___conditions___condition",
  DefaultThemeConditionsValue = "defaultTheme___conditions___value",
  AdditionalThemes = "additionalThemes",
  AdditionalThemesPath = "additionalThemes___path",
  AdditionalThemesIdentifier = "additionalThemes___identifier",
  AdditionalThemesConditions = "additionalThemes___conditions",
  AdditionalThemesConditionsCondition = "additionalThemes___conditions___condition",
  AdditionalThemesConditionsValue = "additionalThemes___conditions___value",
  TokenizedLines = "tokenizedLines",
  TokenizedLinesTokens = "tokenizedLines___tokens",
  TokenizedLinesTokensText = "tokenizedLines___tokens___text",
  TokenizedLinesTokensStartIndex = "tokenizedLines___tokens___startIndex",
  TokenizedLinesTokensEndIndex = "tokenizedLines___tokens___endIndex",
  TokenizedLinesTokensScopes = "tokenizedLines___tokens___scopes",
  TokenizedLinesTokensHtml = "tokenizedLines___tokens___html",
  TokenizedLinesTokensClassName = "tokenizedLines___tokens___className",
  TokenizedLinesTokensDefaultThemeTokenDataThemeIdentifier = "tokenizedLines___tokens___defaultThemeTokenData___themeIdentifier",
  TokenizedLinesTokensDefaultThemeTokenDataClassName = "tokenizedLines___tokens___defaultThemeTokenData___className",
  TokenizedLinesTokensDefaultThemeTokenDataMeta = "tokenizedLines___tokens___defaultThemeTokenData___meta",
  TokenizedLinesTokensDefaultThemeTokenDataColor = "tokenizedLines___tokens___defaultThemeTokenData___color",
  TokenizedLinesTokensDefaultThemeTokenDataBold = "tokenizedLines___tokens___defaultThemeTokenData___bold",
  TokenizedLinesTokensDefaultThemeTokenDataItalic = "tokenizedLines___tokens___defaultThemeTokenData___italic",
  TokenizedLinesTokensDefaultThemeTokenDataUnderline = "tokenizedLines___tokens___defaultThemeTokenData___underline",
  TokenizedLinesTokensAdditionalThemeTokenData = "tokenizedLines___tokens___additionalThemeTokenData",
  TokenizedLinesTokensAdditionalThemeTokenDataThemeIdentifier = "tokenizedLines___tokens___additionalThemeTokenData___themeIdentifier",
  TokenizedLinesTokensAdditionalThemeTokenDataClassName = "tokenizedLines___tokens___additionalThemeTokenData___className",
  TokenizedLinesTokensAdditionalThemeTokenDataMeta = "tokenizedLines___tokens___additionalThemeTokenData___meta",
  TokenizedLinesTokensAdditionalThemeTokenDataColor = "tokenizedLines___tokens___additionalThemeTokenData___color",
  TokenizedLinesTokensAdditionalThemeTokenDataBold = "tokenizedLines___tokens___additionalThemeTokenData___bold",
  TokenizedLinesTokensAdditionalThemeTokenDataItalic = "tokenizedLines___tokens___additionalThemeTokenData___italic",
  TokenizedLinesTokensAdditionalThemeTokenDataUnderline = "tokenizedLines___tokens___additionalThemeTokenData___underline",
  TokenizedLinesGutterCells = "tokenizedLines___gutterCells",
  TokenizedLinesGutterCellsClassName = "tokenizedLines___gutterCells___className",
  TokenizedLinesGutterCellsText = "tokenizedLines___gutterCells___text",
  TokenizedLinesText = "tokenizedLines___text",
  TokenizedLinesHtml = "tokenizedLines___html",
  TokenizedLinesAttrs = "tokenizedLines___attrs",
  TokenizedLinesClassName = "tokenizedLines___className",
  TokenizedLinesData = "tokenizedLines___data",
  TokenizedLinesIsHighlighted = "tokenizedLines___isHighlighted",
  TokenizedLinesLineNumber = "tokenizedLines___lineNumber",
  TokenizedLinesDiff = "tokenizedLines___diff",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type GrvscCodeBlockFilterInput = {
  index?: Maybe<IntQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  text?: Maybe<StringQueryOperatorInput>
  preClassName?: Maybe<StringQueryOperatorInput>
  codeClassName?: Maybe<StringQueryOperatorInput>
  language?: Maybe<StringQueryOperatorInput>
  meta?: Maybe<JsonQueryOperatorInput>
  defaultTheme?: Maybe<GrvscThemeFilterInput>
  additionalThemes?: Maybe<GrvscThemeFilterListInput>
  tokenizedLines?: Maybe<GrvscTokenizedLineFilterListInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type GrvscCodeBlockGroupConnection = {
  __typename?: "GRVSCCodeBlockGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscCodeBlockEdge>
  nodes: Array<GrvscCodeBlock>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type GrvscCodeBlockSortInput = {
  fields?: Maybe<Array<Maybe<GrvscCodeBlockFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type GrvscCodeSpan = Node & {
  __typename?: "GRVSCCodeSpan"
  index: Scalars["Int"]
  html: Scalars["String"]
  text: Scalars["String"]
  className?: Maybe<Scalars["String"]>
  language?: Maybe<Scalars["String"]>
  defaultTheme: GrvscTheme
  additionalThemes: Array<GrvscTheme>
  tokens: Array<GrvscToken>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type GrvscCodeSpanConnection = {
  __typename?: "GRVSCCodeSpanConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscCodeSpanEdge>
  nodes: Array<GrvscCodeSpan>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<GrvscCodeSpanGroupConnection>
}

export type GrvscCodeSpanConnectionDistinctArgs = {
  field: GrvscCodeSpanFieldsEnum
}

export type GrvscCodeSpanConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: GrvscCodeSpanFieldsEnum
}

export type GrvscCodeSpanEdge = {
  __typename?: "GRVSCCodeSpanEdge"
  next?: Maybe<GrvscCodeSpan>
  node: GrvscCodeSpan
  previous?: Maybe<GrvscCodeSpan>
}

export enum GrvscCodeSpanFieldsEnum {
  Index = "index",
  Html = "html",
  Text = "text",
  ClassName = "className",
  Language = "language",
  DefaultThemePath = "defaultTheme___path",
  DefaultThemeIdentifier = "defaultTheme___identifier",
  DefaultThemeConditions = "defaultTheme___conditions",
  DefaultThemeConditionsCondition = "defaultTheme___conditions___condition",
  DefaultThemeConditionsValue = "defaultTheme___conditions___value",
  AdditionalThemes = "additionalThemes",
  AdditionalThemesPath = "additionalThemes___path",
  AdditionalThemesIdentifier = "additionalThemes___identifier",
  AdditionalThemesConditions = "additionalThemes___conditions",
  AdditionalThemesConditionsCondition = "additionalThemes___conditions___condition",
  AdditionalThemesConditionsValue = "additionalThemes___conditions___value",
  Tokens = "tokens",
  TokensText = "tokens___text",
  TokensStartIndex = "tokens___startIndex",
  TokensEndIndex = "tokens___endIndex",
  TokensScopes = "tokens___scopes",
  TokensHtml = "tokens___html",
  TokensClassName = "tokens___className",
  TokensDefaultThemeTokenDataThemeIdentifier = "tokens___defaultThemeTokenData___themeIdentifier",
  TokensDefaultThemeTokenDataClassName = "tokens___defaultThemeTokenData___className",
  TokensDefaultThemeTokenDataMeta = "tokens___defaultThemeTokenData___meta",
  TokensDefaultThemeTokenDataColor = "tokens___defaultThemeTokenData___color",
  TokensDefaultThemeTokenDataBold = "tokens___defaultThemeTokenData___bold",
  TokensDefaultThemeTokenDataItalic = "tokens___defaultThemeTokenData___italic",
  TokensDefaultThemeTokenDataUnderline = "tokens___defaultThemeTokenData___underline",
  TokensAdditionalThemeTokenData = "tokens___additionalThemeTokenData",
  TokensAdditionalThemeTokenDataThemeIdentifier = "tokens___additionalThemeTokenData___themeIdentifier",
  TokensAdditionalThemeTokenDataClassName = "tokens___additionalThemeTokenData___className",
  TokensAdditionalThemeTokenDataMeta = "tokens___additionalThemeTokenData___meta",
  TokensAdditionalThemeTokenDataColor = "tokens___additionalThemeTokenData___color",
  TokensAdditionalThemeTokenDataBold = "tokens___additionalThemeTokenData___bold",
  TokensAdditionalThemeTokenDataItalic = "tokens___additionalThemeTokenData___italic",
  TokensAdditionalThemeTokenDataUnderline = "tokens___additionalThemeTokenData___underline",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type GrvscCodeSpanFilterInput = {
  index?: Maybe<IntQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  text?: Maybe<StringQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  language?: Maybe<StringQueryOperatorInput>
  defaultTheme?: Maybe<GrvscThemeFilterInput>
  additionalThemes?: Maybe<GrvscThemeFilterListInput>
  tokens?: Maybe<GrvscTokenFilterListInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type GrvscCodeSpanGroupConnection = {
  __typename?: "GRVSCCodeSpanGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscCodeSpanEdge>
  nodes: Array<GrvscCodeSpan>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type GrvscCodeSpanSortInput = {
  fields?: Maybe<Array<Maybe<GrvscCodeSpanFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export enum GrvscDiff {
  Add = "ADD",
  Del = "DEL",
}

export type GrvscDiffQueryOperatorInput = {
  eq?: Maybe<GrvscDiff>
  ne?: Maybe<GrvscDiff>
  in?: Maybe<Array<Maybe<GrvscDiff>>>
  nin?: Maybe<Array<Maybe<GrvscDiff>>>
}

export type GrvscGutterCell = {
  __typename?: "GRVSCGutterCell"
  className?: Maybe<Scalars["String"]>
  text?: Maybe<Scalars["String"]>
}

export type GrvscGutterCellFilterInput = {
  className?: Maybe<StringQueryOperatorInput>
  text?: Maybe<StringQueryOperatorInput>
}

export type GrvscGutterCellFilterListInput = {
  elemMatch?: Maybe<GrvscGutterCellFilterInput>
}

export type GrvscStylesheet = Node & {
  __typename?: "GRVSCStylesheet"
  css: Scalars["String"]
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type GrvscStylesheetConnection = {
  __typename?: "GRVSCStylesheetConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscStylesheetEdge>
  nodes: Array<GrvscStylesheet>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<GrvscStylesheetGroupConnection>
}

export type GrvscStylesheetConnectionDistinctArgs = {
  field: GrvscStylesheetFieldsEnum
}

export type GrvscStylesheetConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: GrvscStylesheetFieldsEnum
}

export type GrvscStylesheetEdge = {
  __typename?: "GRVSCStylesheetEdge"
  next?: Maybe<GrvscStylesheet>
  node: GrvscStylesheet
  previous?: Maybe<GrvscStylesheet>
}

export enum GrvscStylesheetFieldsEnum {
  Css = "css",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type GrvscStylesheetFilterInput = {
  css?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type GrvscStylesheetGroupConnection = {
  __typename?: "GRVSCStylesheetGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<GrvscStylesheetEdge>
  nodes: Array<GrvscStylesheet>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type GrvscStylesheetSortInput = {
  fields?: Maybe<Array<Maybe<GrvscStylesheetFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type GrvscTheme = {
  __typename?: "GRVSCTheme"
  path: Scalars["String"]
  identifier: Scalars["String"]
  conditions: Array<GrvscThemeCondition>
}

export type GrvscThemeArgument = {
  identifier: Scalars["String"]
  conditions: Array<Scalars["String"]>
}

export type GrvscThemeCondition = {
  __typename?: "GRVSCThemeCondition"
  condition: GrvscThemeConditionKind
  value?: Maybe<Scalars["String"]>
}

export type GrvscThemeConditionFilterInput = {
  condition?: Maybe<GrvscThemeConditionKindQueryOperatorInput>
  value?: Maybe<StringQueryOperatorInput>
}

export type GrvscThemeConditionFilterListInput = {
  elemMatch?: Maybe<GrvscThemeConditionFilterInput>
}

export enum GrvscThemeConditionKind {
  Default = "default",
  MatchMedia = "matchMedia",
  ParentSelector = "parentSelector",
}

export type GrvscThemeConditionKindQueryOperatorInput = {
  eq?: Maybe<GrvscThemeConditionKind>
  ne?: Maybe<GrvscThemeConditionKind>
  in?: Maybe<Array<Maybe<GrvscThemeConditionKind>>>
  nin?: Maybe<Array<Maybe<GrvscThemeConditionKind>>>
}

export type GrvscThemeFilterInput = {
  path?: Maybe<StringQueryOperatorInput>
  identifier?: Maybe<StringQueryOperatorInput>
  conditions?: Maybe<GrvscThemeConditionFilterListInput>
}

export type GrvscThemeFilterListInput = {
  elemMatch?: Maybe<GrvscThemeFilterInput>
}

export type GrvscThemeTokenData = {
  __typename?: "GRVSCThemeTokenData"
  themeIdentifier: Scalars["String"]
  className: Scalars["String"]
  meta: Scalars["Int"]
  color: Scalars["String"]
  bold: Scalars["Boolean"]
  italic: Scalars["Boolean"]
  underline: Scalars["Boolean"]
}

export type GrvscThemeTokenDataFilterInput = {
  themeIdentifier?: Maybe<StringQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  meta?: Maybe<IntQueryOperatorInput>
  color?: Maybe<StringQueryOperatorInput>
  bold?: Maybe<BooleanQueryOperatorInput>
  italic?: Maybe<BooleanQueryOperatorInput>
  underline?: Maybe<BooleanQueryOperatorInput>
}

export type GrvscThemeTokenDataFilterListInput = {
  elemMatch?: Maybe<GrvscThemeTokenDataFilterInput>
}

export type GrvscToken = {
  __typename?: "GRVSCToken"
  text: Scalars["String"]
  startIndex: Scalars["Int"]
  endIndex: Scalars["Int"]
  scopes: Array<Scalars["String"]>
  html: Scalars["String"]
  className: Scalars["String"]
  defaultThemeTokenData: GrvscThemeTokenData
  additionalThemeTokenData: Array<GrvscThemeTokenData>
}

export type GrvscTokenFilterInput = {
  text?: Maybe<StringQueryOperatorInput>
  startIndex?: Maybe<IntQueryOperatorInput>
  endIndex?: Maybe<IntQueryOperatorInput>
  scopes?: Maybe<StringQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  defaultThemeTokenData?: Maybe<GrvscThemeTokenDataFilterInput>
  additionalThemeTokenData?: Maybe<GrvscThemeTokenDataFilterListInput>
}

export type GrvscTokenFilterListInput = {
  elemMatch?: Maybe<GrvscTokenFilterInput>
}

export type GrvscTokenizedLine = {
  __typename?: "GRVSCTokenizedLine"
  tokens: Array<GrvscToken>
  gutterCells?: Maybe<Array<Maybe<GrvscGutterCell>>>
  text: Scalars["String"]
  html: Scalars["String"]
  attrs: Scalars["JSON"]
  className: Scalars["String"]
  data: Scalars["JSON"]
  isHighlighted?: Maybe<Scalars["Boolean"]>
  lineNumber?: Maybe<Scalars["Int"]>
  diff?: Maybe<GrvscDiff>
}

export type GrvscTokenizedLineFilterInput = {
  tokens?: Maybe<GrvscTokenFilterListInput>
  gutterCells?: Maybe<GrvscGutterCellFilterListInput>
  text?: Maybe<StringQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  attrs?: Maybe<JsonQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  data?: Maybe<JsonQueryOperatorInput>
  isHighlighted?: Maybe<BooleanQueryOperatorInput>
  lineNumber?: Maybe<IntQueryOperatorInput>
  diff?: Maybe<GrvscDiffQueryOperatorInput>
}

export type GrvscTokenizedLineFilterListInput = {
  elemMatch?: Maybe<GrvscTokenizedLineFilterInput>
}

export enum ImageCropFocus {
  Center = "CENTER",
  North = "NORTH",
  Northeast = "NORTHEAST",
  East = "EAST",
  Southeast = "SOUTHEAST",
  South = "SOUTH",
  Southwest = "SOUTHWEST",
  West = "WEST",
  Northwest = "NORTHWEST",
  Entropy = "ENTROPY",
  Attention = "ATTENTION",
}

export enum ImageFit {
  Cover = "COVER",
  Contain = "CONTAIN",
  Fill = "FILL",
  Inside = "INSIDE",
  Outside = "OUTSIDE",
}

export enum ImageFormat {
  NoChange = "NO_CHANGE",
  Auto = "AUTO",
  Jpg = "JPG",
  Png = "PNG",
  Webp = "WEBP",
  Avif = "AVIF",
}

export enum ImageLayout {
  Fixed = "FIXED",
  FullWidth = "FULL_WIDTH",
  Constrained = "CONSTRAINED",
}

export enum ImagePlaceholder {
  DominantColor = "DOMINANT_COLOR",
  TracedSvg = "TRACED_SVG",
  Blurred = "BLURRED",
  None = "NONE",
}

export type ImageSharp = Node & {
  __typename?: "ImageSharp"
  fixed?: Maybe<ImageSharpFixed>
  /** @deprecated Resolutions was deprecated in Gatsby v2. It's been renamed to "fixed" https://example.com/write-docs-and-fix-this-example-link */
  resolutions?: Maybe<ImageSharpResolutions>
  fluid?: Maybe<ImageSharpFluid>
  /** @deprecated Sizes was deprecated in Gatsby v2. It's been renamed to "fluid" https://example.com/write-docs-and-fix-this-example-link */
  sizes?: Maybe<ImageSharpSizes>
  gatsbyImageData: Scalars["JSON"]
  original?: Maybe<ImageSharpOriginal>
  resize?: Maybe<ImageSharpResize>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type ImageSharpFixedArgs = {
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  base64Width?: Maybe<Scalars["Int"]>
  jpegProgressive?: Maybe<Scalars["Boolean"]>
  pngCompressionSpeed?: Maybe<Scalars["Int"]>
  grayscale?: Maybe<Scalars["Boolean"]>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars["Int"]>
  jpegQuality?: Maybe<Scalars["Int"]>
  pngQuality?: Maybe<Scalars["Int"]>
  webpQuality?: Maybe<Scalars["Int"]>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars["String"]>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
}

export type ImageSharpResolutionsArgs = {
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  base64Width?: Maybe<Scalars["Int"]>
  jpegProgressive?: Maybe<Scalars["Boolean"]>
  pngCompressionSpeed?: Maybe<Scalars["Int"]>
  grayscale?: Maybe<Scalars["Boolean"]>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars["Int"]>
  jpegQuality?: Maybe<Scalars["Int"]>
  pngQuality?: Maybe<Scalars["Int"]>
  webpQuality?: Maybe<Scalars["Int"]>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars["String"]>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
}

export type ImageSharpFluidArgs = {
  maxWidth?: Maybe<Scalars["Int"]>
  maxHeight?: Maybe<Scalars["Int"]>
  base64Width?: Maybe<Scalars["Int"]>
  grayscale?: Maybe<Scalars["Boolean"]>
  jpegProgressive?: Maybe<Scalars["Boolean"]>
  pngCompressionSpeed?: Maybe<Scalars["Int"]>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars["Int"]>
  jpegQuality?: Maybe<Scalars["Int"]>
  pngQuality?: Maybe<Scalars["Int"]>
  webpQuality?: Maybe<Scalars["Int"]>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars["String"]>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
  sizes?: Maybe<Scalars["String"]>
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars["Int"]>>>
}

export type ImageSharpSizesArgs = {
  maxWidth?: Maybe<Scalars["Int"]>
  maxHeight?: Maybe<Scalars["Int"]>
  base64Width?: Maybe<Scalars["Int"]>
  grayscale?: Maybe<Scalars["Boolean"]>
  jpegProgressive?: Maybe<Scalars["Boolean"]>
  pngCompressionSpeed?: Maybe<Scalars["Int"]>
  duotone?: Maybe<DuotoneGradient>
  traceSVG?: Maybe<Potrace>
  quality?: Maybe<Scalars["Int"]>
  jpegQuality?: Maybe<Scalars["Int"]>
  pngQuality?: Maybe<Scalars["Int"]>
  webpQuality?: Maybe<Scalars["Int"]>
  toFormat?: Maybe<ImageFormat>
  toFormatBase64?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars["String"]>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
  sizes?: Maybe<Scalars["String"]>
  srcSetBreakpoints?: Maybe<Array<Maybe<Scalars["Int"]>>>
}

export type ImageSharpGatsbyImageDataArgs = {
  layout?: Maybe<ImageLayout>
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  placeholder?: Maybe<ImagePlaceholder>
  blurredOptions?: Maybe<BlurredOptions>
  tracedSVGOptions?: Maybe<Potrace>
  formats?: Maybe<Array<Maybe<ImageFormat>>>
  outputPixelDensities?: Maybe<Array<Maybe<Scalars["Float"]>>>
  breakpoints?: Maybe<Array<Maybe<Scalars["Int"]>>>
  sizes?: Maybe<Scalars["String"]>
  quality?: Maybe<Scalars["Int"]>
  jpgOptions?: Maybe<JpgOptions>
  pngOptions?: Maybe<PngOptions>
  webpOptions?: Maybe<WebPOptions>
  avifOptions?: Maybe<AvifOptions>
  transformOptions?: Maybe<TransformOptions>
  backgroundColor?: Maybe<Scalars["String"]>
}

export type ImageSharpResizeArgs = {
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  quality?: Maybe<Scalars["Int"]>
  jpegQuality?: Maybe<Scalars["Int"]>
  pngQuality?: Maybe<Scalars["Int"]>
  webpQuality?: Maybe<Scalars["Int"]>
  jpegProgressive?: Maybe<Scalars["Boolean"]>
  pngCompressionLevel?: Maybe<Scalars["Int"]>
  pngCompressionSpeed?: Maybe<Scalars["Int"]>
  grayscale?: Maybe<Scalars["Boolean"]>
  duotone?: Maybe<DuotoneGradient>
  base64?: Maybe<Scalars["Boolean"]>
  traceSVG?: Maybe<Potrace>
  toFormat?: Maybe<ImageFormat>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
  background?: Maybe<Scalars["String"]>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
}

export type ImageSharpConnection = {
  __typename?: "ImageSharpConnection"
  totalCount: Scalars["Int"]
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<ImageSharpGroupConnection>
}

export type ImageSharpConnectionDistinctArgs = {
  field: ImageSharpFieldsEnum
}

export type ImageSharpConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: ImageSharpFieldsEnum
}

export type ImageSharpEdge = {
  __typename?: "ImageSharpEdge"
  next?: Maybe<ImageSharp>
  node: ImageSharp
  previous?: Maybe<ImageSharp>
}

export enum ImageSharpFieldsEnum {
  FixedBase64 = "fixed___base64",
  FixedTracedSvg = "fixed___tracedSVG",
  FixedAspectRatio = "fixed___aspectRatio",
  FixedWidth = "fixed___width",
  FixedHeight = "fixed___height",
  FixedSrc = "fixed___src",
  FixedSrcSet = "fixed___srcSet",
  FixedSrcWebp = "fixed___srcWebp",
  FixedSrcSetWebp = "fixed___srcSetWebp",
  FixedOriginalName = "fixed___originalName",
  ResolutionsBase64 = "resolutions___base64",
  ResolutionsTracedSvg = "resolutions___tracedSVG",
  ResolutionsAspectRatio = "resolutions___aspectRatio",
  ResolutionsWidth = "resolutions___width",
  ResolutionsHeight = "resolutions___height",
  ResolutionsSrc = "resolutions___src",
  ResolutionsSrcSet = "resolutions___srcSet",
  ResolutionsSrcWebp = "resolutions___srcWebp",
  ResolutionsSrcSetWebp = "resolutions___srcSetWebp",
  ResolutionsOriginalName = "resolutions___originalName",
  FluidBase64 = "fluid___base64",
  FluidTracedSvg = "fluid___tracedSVG",
  FluidAspectRatio = "fluid___aspectRatio",
  FluidSrc = "fluid___src",
  FluidSrcSet = "fluid___srcSet",
  FluidSrcWebp = "fluid___srcWebp",
  FluidSrcSetWebp = "fluid___srcSetWebp",
  FluidSizes = "fluid___sizes",
  FluidOriginalImg = "fluid___originalImg",
  FluidOriginalName = "fluid___originalName",
  FluidPresentationWidth = "fluid___presentationWidth",
  FluidPresentationHeight = "fluid___presentationHeight",
  SizesBase64 = "sizes___base64",
  SizesTracedSvg = "sizes___tracedSVG",
  SizesAspectRatio = "sizes___aspectRatio",
  SizesSrc = "sizes___src",
  SizesSrcSet = "sizes___srcSet",
  SizesSrcWebp = "sizes___srcWebp",
  SizesSrcSetWebp = "sizes___srcSetWebp",
  SizesSizes = "sizes___sizes",
  SizesOriginalImg = "sizes___originalImg",
  SizesOriginalName = "sizes___originalName",
  SizesPresentationWidth = "sizes___presentationWidth",
  SizesPresentationHeight = "sizes___presentationHeight",
  GatsbyImageData = "gatsbyImageData",
  OriginalWidth = "original___width",
  OriginalHeight = "original___height",
  OriginalSrc = "original___src",
  ResizeSrc = "resize___src",
  ResizeTracedSvg = "resize___tracedSVG",
  ResizeWidth = "resize___width",
  ResizeHeight = "resize___height",
  ResizeAspectRatio = "resize___aspectRatio",
  ResizeOriginalName = "resize___originalName",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type ImageSharpFilterInput = {
  fixed?: Maybe<ImageSharpFixedFilterInput>
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>
  fluid?: Maybe<ImageSharpFluidFilterInput>
  sizes?: Maybe<ImageSharpSizesFilterInput>
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>
  original?: Maybe<ImageSharpOriginalFilterInput>
  resize?: Maybe<ImageSharpResizeFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type ImageSharpFilterListInput = {
  elemMatch?: Maybe<ImageSharpFilterInput>
}

export type ImageSharpFixed = {
  __typename?: "ImageSharpFixed"
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  width: Scalars["Float"]
  height: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
}

export type ImageSharpFixedFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  width?: Maybe<FloatQueryOperatorInput>
  height?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpFluid = {
  __typename?: "ImageSharpFluid"
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  sizes: Scalars["String"]
  originalImg?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
  presentationWidth: Scalars["Int"]
  presentationHeight: Scalars["Int"]
}

export type ImageSharpFluidFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  sizes?: Maybe<StringQueryOperatorInput>
  originalImg?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
  presentationWidth?: Maybe<IntQueryOperatorInput>
  presentationHeight?: Maybe<IntQueryOperatorInput>
}

export type ImageSharpGroupConnection = {
  __typename?: "ImageSharpGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<ImageSharpEdge>
  nodes: Array<ImageSharp>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type ImageSharpOriginal = {
  __typename?: "ImageSharpOriginal"
  width?: Maybe<Scalars["Float"]>
  height?: Maybe<Scalars["Float"]>
  src?: Maybe<Scalars["String"]>
}

export type ImageSharpOriginalFilterInput = {
  width?: Maybe<FloatQueryOperatorInput>
  height?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpResize = {
  __typename?: "ImageSharpResize"
  src?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  width?: Maybe<Scalars["Int"]>
  height?: Maybe<Scalars["Int"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  originalName?: Maybe<Scalars["String"]>
}

export type ImageSharpResizeFilterInput = {
  src?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  width?: Maybe<IntQueryOperatorInput>
  height?: Maybe<IntQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpResolutions = {
  __typename?: "ImageSharpResolutions"
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio?: Maybe<Scalars["Float"]>
  width: Scalars["Float"]
  height: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
}

export type ImageSharpResolutionsFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  width?: Maybe<FloatQueryOperatorInput>
  height?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
}

export type ImageSharpSizes = {
  __typename?: "ImageSharpSizes"
  base64?: Maybe<Scalars["String"]>
  tracedSVG?: Maybe<Scalars["String"]>
  aspectRatio: Scalars["Float"]
  src: Scalars["String"]
  srcSet: Scalars["String"]
  srcWebp?: Maybe<Scalars["String"]>
  srcSetWebp?: Maybe<Scalars["String"]>
  sizes: Scalars["String"]
  originalImg?: Maybe<Scalars["String"]>
  originalName?: Maybe<Scalars["String"]>
  presentationWidth: Scalars["Int"]
  presentationHeight: Scalars["Int"]
}

export type ImageSharpSizesFilterInput = {
  base64?: Maybe<StringQueryOperatorInput>
  tracedSVG?: Maybe<StringQueryOperatorInput>
  aspectRatio?: Maybe<FloatQueryOperatorInput>
  src?: Maybe<StringQueryOperatorInput>
  srcSet?: Maybe<StringQueryOperatorInput>
  srcWebp?: Maybe<StringQueryOperatorInput>
  srcSetWebp?: Maybe<StringQueryOperatorInput>
  sizes?: Maybe<StringQueryOperatorInput>
  originalImg?: Maybe<StringQueryOperatorInput>
  originalName?: Maybe<StringQueryOperatorInput>
  presentationWidth?: Maybe<IntQueryOperatorInput>
  presentationHeight?: Maybe<IntQueryOperatorInput>
}

export type ImageSharpSortInput = {
  fields?: Maybe<Array<Maybe<ImageSharpFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type Internal = {
  __typename?: "Internal"
  content?: Maybe<Scalars["String"]>
  contentDigest: Scalars["String"]
  description?: Maybe<Scalars["String"]>
  fieldOwners?: Maybe<Array<Maybe<Scalars["String"]>>>
  ignoreType?: Maybe<Scalars["Boolean"]>
  mediaType?: Maybe<Scalars["String"]>
  owner: Scalars["String"]
  type: Scalars["String"]
}

export type InternalFilterInput = {
  content?: Maybe<StringQueryOperatorInput>
  contentDigest?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  fieldOwners?: Maybe<StringQueryOperatorInput>
  ignoreType?: Maybe<BooleanQueryOperatorInput>
  mediaType?: Maybe<StringQueryOperatorInput>
  owner?: Maybe<StringQueryOperatorInput>
  type?: Maybe<StringQueryOperatorInput>
}

export type IntQueryOperatorInput = {
  eq?: Maybe<Scalars["Int"]>
  ne?: Maybe<Scalars["Int"]>
  gt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  lt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Maybe<Scalars["Int"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Int"]>>>
}

export type JpgOptions = {
  quality?: Maybe<Scalars["Int"]>
  progressive?: Maybe<Scalars["Boolean"]>
}

export type JsonQueryOperatorInput = {
  eq?: Maybe<Scalars["JSON"]>
  ne?: Maybe<Scalars["JSON"]>
  in?: Maybe<Array<Maybe<Scalars["JSON"]>>>
  nin?: Maybe<Array<Maybe<Scalars["JSON"]>>>
  regex?: Maybe<Scalars["JSON"]>
  glob?: Maybe<Scalars["JSON"]>
}

export enum MarkdownExcerptFormats {
  Plain = "PLAIN",
  Html = "HTML",
  Markdown = "MARKDOWN",
}

export type MarkdownHeading = {
  __typename?: "MarkdownHeading"
  id?: Maybe<Scalars["String"]>
  value?: Maybe<Scalars["String"]>
  depth?: Maybe<Scalars["Int"]>
}

export type MarkdownHeadingFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  value?: Maybe<StringQueryOperatorInput>
  depth?: Maybe<IntQueryOperatorInput>
}

export type MarkdownHeadingFilterListInput = {
  elemMatch?: Maybe<MarkdownHeadingFilterInput>
}

export enum MarkdownHeadingLevels {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export type MarkdownRemark = Node & {
  __typename?: "MarkdownRemark"
  id: Scalars["ID"]
  frontmatter?: Maybe<Frontmatter>
  fields?: Maybe<Fields>
  excerpt?: Maybe<Scalars["String"]>
  rawMarkdownBody?: Maybe<Scalars["String"]>
  fileAbsolutePath?: Maybe<Scalars["String"]>
  html?: Maybe<Scalars["String"]>
  htmlAst?: Maybe<Scalars["JSON"]>
  excerptAst?: Maybe<Scalars["JSON"]>
  headings?: Maybe<Array<Maybe<MarkdownHeading>>>
  timeToRead?: Maybe<Scalars["Int"]>
  tableOfContents?: Maybe<Scalars["String"]>
  wordCount?: Maybe<MarkdownWordCount>
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  grvscCodeBlocks?: Maybe<Array<Maybe<GrvscCodeBlock>>>
  grvscCodeSpans?: Maybe<Array<Maybe<GrvscCodeSpan>>>
}

export type MarkdownRemarkExcerptArgs = {
  pruneLength?: Maybe<Scalars["Int"]>
  truncate?: Maybe<Scalars["Boolean"]>
  format?: Maybe<MarkdownExcerptFormats>
}

export type MarkdownRemarkExcerptAstArgs = {
  pruneLength?: Maybe<Scalars["Int"]>
  truncate?: Maybe<Scalars["Boolean"]>
}

export type MarkdownRemarkHeadingsArgs = {
  depth?: Maybe<MarkdownHeadingLevels>
}

export type MarkdownRemarkTableOfContentsArgs = {
  absolute?: Maybe<Scalars["Boolean"]>
  pathToSlugField?: Maybe<Scalars["String"]>
  maxDepth?: Maybe<Scalars["Int"]>
  heading?: Maybe<Scalars["String"]>
}

export type MarkdownRemarkConnection = {
  __typename?: "MarkdownRemarkConnection"
  totalCount: Scalars["Int"]
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<MarkdownRemarkGroupConnection>
}

export type MarkdownRemarkConnectionDistinctArgs = {
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: MarkdownRemarkFieldsEnum
}

export type MarkdownRemarkEdge = {
  __typename?: "MarkdownRemarkEdge"
  next?: Maybe<MarkdownRemark>
  node: MarkdownRemark
  previous?: Maybe<MarkdownRemark>
}

export enum MarkdownRemarkFieldsEnum {
  Id = "id",
  FrontmatterTitle = "frontmatter___title",
  FrontmatterDescription = "frontmatter___description",
  FrontmatterDate = "frontmatter___date",
  FrontmatterFeaturedSourceInstanceName = "frontmatter___featured___sourceInstanceName",
  FrontmatterFeaturedAbsolutePath = "frontmatter___featured___absolutePath",
  FrontmatterFeaturedRelativePath = "frontmatter___featured___relativePath",
  FrontmatterFeaturedExtension = "frontmatter___featured___extension",
  FrontmatterFeaturedSize = "frontmatter___featured___size",
  FrontmatterFeaturedPrettySize = "frontmatter___featured___prettySize",
  FrontmatterFeaturedModifiedTime = "frontmatter___featured___modifiedTime",
  FrontmatterFeaturedAccessTime = "frontmatter___featured___accessTime",
  FrontmatterFeaturedChangeTime = "frontmatter___featured___changeTime",
  FrontmatterFeaturedBirthTime = "frontmatter___featured___birthTime",
  FrontmatterFeaturedRoot = "frontmatter___featured___root",
  FrontmatterFeaturedDir = "frontmatter___featured___dir",
  FrontmatterFeaturedBase = "frontmatter___featured___base",
  FrontmatterFeaturedExt = "frontmatter___featured___ext",
  FrontmatterFeaturedName = "frontmatter___featured___name",
  FrontmatterFeaturedRelativeDirectory = "frontmatter___featured___relativeDirectory",
  FrontmatterFeaturedDev = "frontmatter___featured___dev",
  FrontmatterFeaturedMode = "frontmatter___featured___mode",
  FrontmatterFeaturedNlink = "frontmatter___featured___nlink",
  FrontmatterFeaturedUid = "frontmatter___featured___uid",
  FrontmatterFeaturedGid = "frontmatter___featured___gid",
  FrontmatterFeaturedRdev = "frontmatter___featured___rdev",
  FrontmatterFeaturedIno = "frontmatter___featured___ino",
  FrontmatterFeaturedAtimeMs = "frontmatter___featured___atimeMs",
  FrontmatterFeaturedMtimeMs = "frontmatter___featured___mtimeMs",
  FrontmatterFeaturedCtimeMs = "frontmatter___featured___ctimeMs",
  FrontmatterFeaturedAtime = "frontmatter___featured___atime",
  FrontmatterFeaturedMtime = "frontmatter___featured___mtime",
  FrontmatterFeaturedCtime = "frontmatter___featured___ctime",
  FrontmatterFeaturedBirthtime = "frontmatter___featured___birthtime",
  FrontmatterFeaturedBirthtimeMs = "frontmatter___featured___birthtimeMs",
  FrontmatterFeaturedBlksize = "frontmatter___featured___blksize",
  FrontmatterFeaturedBlocks = "frontmatter___featured___blocks",
  FrontmatterFeaturedPublicUrl = "frontmatter___featured___publicURL",
  FrontmatterFeaturedChildrenMarkdownRemark = "frontmatter___featured___childrenMarkdownRemark",
  FrontmatterFeaturedChildrenMarkdownRemarkId = "frontmatter___featured___childrenMarkdownRemark___id",
  FrontmatterFeaturedChildrenMarkdownRemarkExcerpt = "frontmatter___featured___childrenMarkdownRemark___excerpt",
  FrontmatterFeaturedChildrenMarkdownRemarkRawMarkdownBody = "frontmatter___featured___childrenMarkdownRemark___rawMarkdownBody",
  FrontmatterFeaturedChildrenMarkdownRemarkFileAbsolutePath = "frontmatter___featured___childrenMarkdownRemark___fileAbsolutePath",
  FrontmatterFeaturedChildrenMarkdownRemarkHtml = "frontmatter___featured___childrenMarkdownRemark___html",
  FrontmatterFeaturedChildrenMarkdownRemarkHtmlAst = "frontmatter___featured___childrenMarkdownRemark___htmlAst",
  FrontmatterFeaturedChildrenMarkdownRemarkExcerptAst = "frontmatter___featured___childrenMarkdownRemark___excerptAst",
  FrontmatterFeaturedChildrenMarkdownRemarkHeadings = "frontmatter___featured___childrenMarkdownRemark___headings",
  FrontmatterFeaturedChildrenMarkdownRemarkTimeToRead = "frontmatter___featured___childrenMarkdownRemark___timeToRead",
  FrontmatterFeaturedChildrenMarkdownRemarkTableOfContents = "frontmatter___featured___childrenMarkdownRemark___tableOfContents",
  FrontmatterFeaturedChildrenMarkdownRemarkChildren = "frontmatter___featured___childrenMarkdownRemark___children",
  FrontmatterFeaturedChildMarkdownRemarkId = "frontmatter___featured___childMarkdownRemark___id",
  FrontmatterFeaturedChildMarkdownRemarkExcerpt = "frontmatter___featured___childMarkdownRemark___excerpt",
  FrontmatterFeaturedChildMarkdownRemarkRawMarkdownBody = "frontmatter___featured___childMarkdownRemark___rawMarkdownBody",
  FrontmatterFeaturedChildMarkdownRemarkFileAbsolutePath = "frontmatter___featured___childMarkdownRemark___fileAbsolutePath",
  FrontmatterFeaturedChildMarkdownRemarkHtml = "frontmatter___featured___childMarkdownRemark___html",
  FrontmatterFeaturedChildMarkdownRemarkHtmlAst = "frontmatter___featured___childMarkdownRemark___htmlAst",
  FrontmatterFeaturedChildMarkdownRemarkExcerptAst = "frontmatter___featured___childMarkdownRemark___excerptAst",
  FrontmatterFeaturedChildMarkdownRemarkHeadings = "frontmatter___featured___childMarkdownRemark___headings",
  FrontmatterFeaturedChildMarkdownRemarkTimeToRead = "frontmatter___featured___childMarkdownRemark___timeToRead",
  FrontmatterFeaturedChildMarkdownRemarkTableOfContents = "frontmatter___featured___childMarkdownRemark___tableOfContents",
  FrontmatterFeaturedChildMarkdownRemarkChildren = "frontmatter___featured___childMarkdownRemark___children",
  FrontmatterFeaturedChildrenImageSharp = "frontmatter___featured___childrenImageSharp",
  FrontmatterFeaturedChildrenImageSharpGatsbyImageData = "frontmatter___featured___childrenImageSharp___gatsbyImageData",
  FrontmatterFeaturedChildrenImageSharpId = "frontmatter___featured___childrenImageSharp___id",
  FrontmatterFeaturedChildrenImageSharpChildren = "frontmatter___featured___childrenImageSharp___children",
  FrontmatterFeaturedChildImageSharpGatsbyImageData = "frontmatter___featured___childImageSharp___gatsbyImageData",
  FrontmatterFeaturedChildImageSharpId = "frontmatter___featured___childImageSharp___id",
  FrontmatterFeaturedChildImageSharpChildren = "frontmatter___featured___childImageSharp___children",
  FrontmatterFeaturedId = "frontmatter___featured___id",
  FrontmatterFeaturedParentId = "frontmatter___featured___parent___id",
  FrontmatterFeaturedParentChildren = "frontmatter___featured___parent___children",
  FrontmatterFeaturedChildren = "frontmatter___featured___children",
  FrontmatterFeaturedChildrenId = "frontmatter___featured___children___id",
  FrontmatterFeaturedChildrenChildren = "frontmatter___featured___children___children",
  FrontmatterFeaturedInternalContent = "frontmatter___featured___internal___content",
  FrontmatterFeaturedInternalContentDigest = "frontmatter___featured___internal___contentDigest",
  FrontmatterFeaturedInternalDescription = "frontmatter___featured___internal___description",
  FrontmatterFeaturedInternalFieldOwners = "frontmatter___featured___internal___fieldOwners",
  FrontmatterFeaturedInternalIgnoreType = "frontmatter___featured___internal___ignoreType",
  FrontmatterFeaturedInternalMediaType = "frontmatter___featured___internal___mediaType",
  FrontmatterFeaturedInternalOwner = "frontmatter___featured___internal___owner",
  FrontmatterFeaturedInternalType = "frontmatter___featured___internal___type",
  FieldsSlug = "fields___slug",
  Excerpt = "excerpt",
  RawMarkdownBody = "rawMarkdownBody",
  FileAbsolutePath = "fileAbsolutePath",
  Html = "html",
  HtmlAst = "htmlAst",
  ExcerptAst = "excerptAst",
  Headings = "headings",
  HeadingsId = "headings___id",
  HeadingsValue = "headings___value",
  HeadingsDepth = "headings___depth",
  TimeToRead = "timeToRead",
  TableOfContents = "tableOfContents",
  WordCountParagraphs = "wordCount___paragraphs",
  WordCountSentences = "wordCount___sentences",
  WordCountWords = "wordCount___words",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type MarkdownRemarkFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  frontmatter?: Maybe<FrontmatterFilterInput>
  fields?: Maybe<FieldsFilterInput>
  excerpt?: Maybe<StringQueryOperatorInput>
  rawMarkdownBody?: Maybe<StringQueryOperatorInput>
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  htmlAst?: Maybe<JsonQueryOperatorInput>
  excerptAst?: Maybe<JsonQueryOperatorInput>
  headings?: Maybe<MarkdownHeadingFilterListInput>
  timeToRead?: Maybe<IntQueryOperatorInput>
  tableOfContents?: Maybe<StringQueryOperatorInput>
  wordCount?: Maybe<MarkdownWordCountFilterInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type MarkdownRemarkFilterListInput = {
  elemMatch?: Maybe<MarkdownRemarkFilterInput>
}

export type MarkdownRemarkGroupConnection = {
  __typename?: "MarkdownRemarkGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<MarkdownRemarkEdge>
  nodes: Array<MarkdownRemark>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type MarkdownRemarkSortInput = {
  fields?: Maybe<Array<Maybe<MarkdownRemarkFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type MarkdownWordCount = {
  __typename?: "MarkdownWordCount"
  paragraphs?: Maybe<Scalars["Int"]>
  sentences?: Maybe<Scalars["Int"]>
  words?: Maybe<Scalars["Int"]>
}

export type MarkdownWordCountFilterInput = {
  paragraphs?: Maybe<IntQueryOperatorInput>
  sentences?: Maybe<IntQueryOperatorInput>
  words?: Maybe<IntQueryOperatorInput>
}

/** Node Interface */
export type Node = {
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type NodeFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type NodeFilterListInput = {
  elemMatch?: Maybe<NodeFilterInput>
}

export type PageInfo = {
  __typename?: "PageInfo"
  currentPage: Scalars["Int"]
  hasPreviousPage: Scalars["Boolean"]
  hasNextPage: Scalars["Boolean"]
  itemCount: Scalars["Int"]
  pageCount: Scalars["Int"]
  perPage?: Maybe<Scalars["Int"]>
  totalCount: Scalars["Int"]
}

export type PngOptions = {
  quality?: Maybe<Scalars["Int"]>
  compressionSpeed?: Maybe<Scalars["Int"]>
}

export type Potrace = {
  turnPolicy?: Maybe<PotraceTurnPolicy>
  turdSize?: Maybe<Scalars["Float"]>
  alphaMax?: Maybe<Scalars["Float"]>
  optCurve?: Maybe<Scalars["Boolean"]>
  optTolerance?: Maybe<Scalars["Float"]>
  threshold?: Maybe<Scalars["Int"]>
  blackOnWhite?: Maybe<Scalars["Boolean"]>
  color?: Maybe<Scalars["String"]>
  background?: Maybe<Scalars["String"]>
}

export enum PotraceTurnPolicy {
  TurnpolicyBlack = "TURNPOLICY_BLACK",
  TurnpolicyWhite = "TURNPOLICY_WHITE",
  TurnpolicyLeft = "TURNPOLICY_LEFT",
  TurnpolicyRight = "TURNPOLICY_RIGHT",
  TurnpolicyMinority = "TURNPOLICY_MINORITY",
  TurnpolicyMajority = "TURNPOLICY_MAJORITY",
}

export type Query = {
  __typename?: "Query"
  file?: Maybe<File>
  allFile: FileConnection
  directory?: Maybe<Directory>
  allDirectory: DirectoryConnection
  site?: Maybe<Site>
  allSite: SiteConnection
  sitePage?: Maybe<SitePage>
  allSitePage: SitePageConnection
  markdownRemark?: Maybe<MarkdownRemark>
  allMarkdownRemark: MarkdownRemarkConnection
  grvscCodeBlock?: Maybe<GrvscCodeBlock>
  allGrvscCodeBlock: GrvscCodeBlockConnection
  grvscCodeSpan?: Maybe<GrvscCodeSpan>
  allGrvscCodeSpan: GrvscCodeSpanConnection
  grvscStylesheet?: Maybe<GrvscStylesheet>
  allGrvscStylesheet: GrvscStylesheetConnection
  imageSharp?: Maybe<ImageSharp>
  allImageSharp: ImageSharpConnection
  siteBuildMetadata?: Maybe<SiteBuildMetadata>
  allSiteBuildMetadata: SiteBuildMetadataConnection
  sitePlugin?: Maybe<SitePlugin>
  allSitePlugin: SitePluginConnection
  grvscHighlight?: Maybe<GrvscCodeBlock>
}

export type QueryFileArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  publicURL?: Maybe<StringQueryOperatorInput>
  childrenMarkdownRemark?: Maybe<MarkdownRemarkFilterListInput>
  childMarkdownRemark?: Maybe<MarkdownRemarkFilterInput>
  childrenImageSharp?: Maybe<ImageSharpFilterListInput>
  childImageSharp?: Maybe<ImageSharpFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllFileArgs = {
  filter?: Maybe<FileFilterInput>
  sort?: Maybe<FileSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryDirectoryArgs = {
  sourceInstanceName?: Maybe<StringQueryOperatorInput>
  absolutePath?: Maybe<StringQueryOperatorInput>
  relativePath?: Maybe<StringQueryOperatorInput>
  extension?: Maybe<StringQueryOperatorInput>
  size?: Maybe<IntQueryOperatorInput>
  prettySize?: Maybe<StringQueryOperatorInput>
  modifiedTime?: Maybe<DateQueryOperatorInput>
  accessTime?: Maybe<DateQueryOperatorInput>
  changeTime?: Maybe<DateQueryOperatorInput>
  birthTime?: Maybe<DateQueryOperatorInput>
  root?: Maybe<StringQueryOperatorInput>
  dir?: Maybe<StringQueryOperatorInput>
  base?: Maybe<StringQueryOperatorInput>
  ext?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  relativeDirectory?: Maybe<StringQueryOperatorInput>
  dev?: Maybe<IntQueryOperatorInput>
  mode?: Maybe<IntQueryOperatorInput>
  nlink?: Maybe<IntQueryOperatorInput>
  uid?: Maybe<IntQueryOperatorInput>
  gid?: Maybe<IntQueryOperatorInput>
  rdev?: Maybe<IntQueryOperatorInput>
  ino?: Maybe<FloatQueryOperatorInput>
  atimeMs?: Maybe<FloatQueryOperatorInput>
  mtimeMs?: Maybe<FloatQueryOperatorInput>
  ctimeMs?: Maybe<FloatQueryOperatorInput>
  atime?: Maybe<DateQueryOperatorInput>
  mtime?: Maybe<DateQueryOperatorInput>
  ctime?: Maybe<DateQueryOperatorInput>
  birthtime?: Maybe<DateQueryOperatorInput>
  birthtimeMs?: Maybe<FloatQueryOperatorInput>
  blksize?: Maybe<IntQueryOperatorInput>
  blocks?: Maybe<IntQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllDirectoryArgs = {
  filter?: Maybe<DirectoryFilterInput>
  sort?: Maybe<DirectorySortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QuerySiteArgs = {
  buildTime?: Maybe<DateQueryOperatorInput>
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>
  port?: Maybe<IntQueryOperatorInput>
  host?: Maybe<StringQueryOperatorInput>
  polyfill?: Maybe<BooleanQueryOperatorInput>
  pathPrefix?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllSiteArgs = {
  filter?: Maybe<SiteFilterInput>
  sort?: Maybe<SiteSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QuerySitePageArgs = {
  path?: Maybe<StringQueryOperatorInput>
  component?: Maybe<StringQueryOperatorInput>
  internalComponentName?: Maybe<StringQueryOperatorInput>
  componentChunkName?: Maybe<StringQueryOperatorInput>
  matchPath?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>
  context?: Maybe<SitePageContextFilterInput>
  pluginCreator?: Maybe<SitePluginFilterInput>
  pluginCreatorId?: Maybe<StringQueryOperatorInput>
  componentPath?: Maybe<StringQueryOperatorInput>
}

export type QueryAllSitePageArgs = {
  filter?: Maybe<SitePageFilterInput>
  sort?: Maybe<SitePageSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryMarkdownRemarkArgs = {
  id?: Maybe<StringQueryOperatorInput>
  frontmatter?: Maybe<FrontmatterFilterInput>
  fields?: Maybe<FieldsFilterInput>
  excerpt?: Maybe<StringQueryOperatorInput>
  rawMarkdownBody?: Maybe<StringQueryOperatorInput>
  fileAbsolutePath?: Maybe<StringQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  htmlAst?: Maybe<JsonQueryOperatorInput>
  excerptAst?: Maybe<JsonQueryOperatorInput>
  headings?: Maybe<MarkdownHeadingFilterListInput>
  timeToRead?: Maybe<IntQueryOperatorInput>
  tableOfContents?: Maybe<StringQueryOperatorInput>
  wordCount?: Maybe<MarkdownWordCountFilterInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllMarkdownRemarkArgs = {
  filter?: Maybe<MarkdownRemarkFilterInput>
  sort?: Maybe<MarkdownRemarkSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryGrvscCodeBlockArgs = {
  index?: Maybe<IntQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  text?: Maybe<StringQueryOperatorInput>
  preClassName?: Maybe<StringQueryOperatorInput>
  codeClassName?: Maybe<StringQueryOperatorInput>
  language?: Maybe<StringQueryOperatorInput>
  meta?: Maybe<JsonQueryOperatorInput>
  defaultTheme?: Maybe<GrvscThemeFilterInput>
  additionalThemes?: Maybe<GrvscThemeFilterListInput>
  tokenizedLines?: Maybe<GrvscTokenizedLineFilterListInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllGrvscCodeBlockArgs = {
  filter?: Maybe<GrvscCodeBlockFilterInput>
  sort?: Maybe<GrvscCodeBlockSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryGrvscCodeSpanArgs = {
  index?: Maybe<IntQueryOperatorInput>
  html?: Maybe<StringQueryOperatorInput>
  text?: Maybe<StringQueryOperatorInput>
  className?: Maybe<StringQueryOperatorInput>
  language?: Maybe<StringQueryOperatorInput>
  defaultTheme?: Maybe<GrvscThemeFilterInput>
  additionalThemes?: Maybe<GrvscThemeFilterListInput>
  tokens?: Maybe<GrvscTokenFilterListInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllGrvscCodeSpanArgs = {
  filter?: Maybe<GrvscCodeSpanFilterInput>
  sort?: Maybe<GrvscCodeSpanSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryGrvscStylesheetArgs = {
  defaultTheme?: Maybe<Scalars["String"]>
  additionalThemes?: Maybe<Array<GrvscThemeArgument>>
  injectStyles?: Maybe<Scalars["Boolean"]>
}

export type QueryAllGrvscStylesheetArgs = {
  filter?: Maybe<GrvscStylesheetFilterInput>
  sort?: Maybe<GrvscStylesheetSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryImageSharpArgs = {
  fixed?: Maybe<ImageSharpFixedFilterInput>
  resolutions?: Maybe<ImageSharpResolutionsFilterInput>
  fluid?: Maybe<ImageSharpFluidFilterInput>
  sizes?: Maybe<ImageSharpSizesFilterInput>
  gatsbyImageData?: Maybe<JsonQueryOperatorInput>
  original?: Maybe<ImageSharpOriginalFilterInput>
  resize?: Maybe<ImageSharpResizeFilterInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type QueryAllImageSharpArgs = {
  filter?: Maybe<ImageSharpFilterInput>
  sort?: Maybe<ImageSharpSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QuerySiteBuildMetadataArgs = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  buildTime?: Maybe<DateQueryOperatorInput>
}

export type QueryAllSiteBuildMetadataArgs = {
  filter?: Maybe<SiteBuildMetadataFilterInput>
  sort?: Maybe<SiteBuildMetadataSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QuerySitePluginArgs = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  resolve?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  ssrAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>
}

export type QueryAllSitePluginArgs = {
  filter?: Maybe<SitePluginFilterInput>
  sort?: Maybe<SitePluginSortInput>
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
}

export type QueryGrvscHighlightArgs = {
  source: Scalars["String"]
  language?: Maybe<Scalars["String"]>
  meta?: Maybe<Scalars["String"]>
  defaultTheme?: Maybe<Scalars["String"]>
  additionalThemes?: Maybe<Array<GrvscThemeArgument>>
}

export type Site = Node & {
  __typename?: "Site"
  buildTime?: Maybe<Scalars["Date"]>
  siteMetadata?: Maybe<SiteSiteMetadata>
  port?: Maybe<Scalars["Int"]>
  host?: Maybe<Scalars["String"]>
  polyfill?: Maybe<Scalars["Boolean"]>
  pathPrefix?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
}

export type SiteBuildTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type SiteBuildMetadata = Node & {
  __typename?: "SiteBuildMetadata"
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  buildTime?: Maybe<Scalars["Date"]>
}

export type SiteBuildMetadataBuildTimeArgs = {
  formatString?: Maybe<Scalars["String"]>
  fromNow?: Maybe<Scalars["Boolean"]>
  difference?: Maybe<Scalars["String"]>
  locale?: Maybe<Scalars["String"]>
}

export type SiteBuildMetadataConnection = {
  __typename?: "SiteBuildMetadataConnection"
  totalCount: Scalars["Int"]
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<SiteBuildMetadataGroupConnection>
}

export type SiteBuildMetadataConnectionDistinctArgs = {
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: SiteBuildMetadataFieldsEnum
}

export type SiteBuildMetadataEdge = {
  __typename?: "SiteBuildMetadataEdge"
  next?: Maybe<SiteBuildMetadata>
  node: SiteBuildMetadata
  previous?: Maybe<SiteBuildMetadata>
}

export enum SiteBuildMetadataFieldsEnum {
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  BuildTime = "buildTime",
}

export type SiteBuildMetadataFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  buildTime?: Maybe<DateQueryOperatorInput>
}

export type SiteBuildMetadataGroupConnection = {
  __typename?: "SiteBuildMetadataGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<SiteBuildMetadataEdge>
  nodes: Array<SiteBuildMetadata>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SiteBuildMetadataSortInput = {
  fields?: Maybe<Array<Maybe<SiteBuildMetadataFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteConnection = {
  __typename?: "SiteConnection"
  totalCount: Scalars["Int"]
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<SiteGroupConnection>
}

export type SiteConnectionDistinctArgs = {
  field: SiteFieldsEnum
}

export type SiteConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: SiteFieldsEnum
}

export type SiteEdge = {
  __typename?: "SiteEdge"
  next?: Maybe<Site>
  node: Site
  previous?: Maybe<Site>
}

export enum SiteFieldsEnum {
  BuildTime = "buildTime",
  SiteMetadataTitle = "siteMetadata___title",
  SiteMetadataDescription = "siteMetadata___description",
  SiteMetadataAuthorName = "siteMetadata___author___name",
  SiteMetadataAuthorSummary = "siteMetadata___author___summary",
  SiteMetadataSiteUrl = "siteMetadata___siteUrl",
  SiteMetadataSocialTwitter = "siteMetadata___social___twitter",
  SiteMetadataKeywords = "siteMetadata___keywords",
  Port = "port",
  Host = "host",
  Polyfill = "polyfill",
  PathPrefix = "pathPrefix",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
}

export type SiteFilterInput = {
  buildTime?: Maybe<DateQueryOperatorInput>
  siteMetadata?: Maybe<SiteSiteMetadataFilterInput>
  port?: Maybe<IntQueryOperatorInput>
  host?: Maybe<StringQueryOperatorInput>
  polyfill?: Maybe<BooleanQueryOperatorInput>
  pathPrefix?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
}

export type SiteGroupConnection = {
  __typename?: "SiteGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<SiteEdge>
  nodes: Array<Site>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SitePage = Node & {
  __typename?: "SitePage"
  path: Scalars["String"]
  component: Scalars["String"]
  internalComponentName: Scalars["String"]
  componentChunkName: Scalars["String"]
  matchPath?: Maybe<Scalars["String"]>
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  isCreatedByStatefulCreatePages?: Maybe<Scalars["Boolean"]>
  context?: Maybe<SitePageContext>
  pluginCreator?: Maybe<SitePlugin>
  pluginCreatorId?: Maybe<Scalars["String"]>
  componentPath?: Maybe<Scalars["String"]>
}

export type SitePageConnection = {
  __typename?: "SitePageConnection"
  totalCount: Scalars["Int"]
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<SitePageGroupConnection>
}

export type SitePageConnectionDistinctArgs = {
  field: SitePageFieldsEnum
}

export type SitePageConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: SitePageFieldsEnum
}

export type SitePageContext = {
  __typename?: "SitePageContext"
  id?: Maybe<Scalars["String"]>
  previousPostId?: Maybe<Scalars["String"]>
  nextPostId?: Maybe<Scalars["String"]>
}

export type SitePageContextFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  previousPostId?: Maybe<StringQueryOperatorInput>
  nextPostId?: Maybe<StringQueryOperatorInput>
}

export type SitePageEdge = {
  __typename?: "SitePageEdge"
  next?: Maybe<SitePage>
  node: SitePage
  previous?: Maybe<SitePage>
}

export enum SitePageFieldsEnum {
  Path = "path",
  Component = "component",
  InternalComponentName = "internalComponentName",
  ComponentChunkName = "componentChunkName",
  MatchPath = "matchPath",
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  IsCreatedByStatefulCreatePages = "isCreatedByStatefulCreatePages",
  ContextId = "context___id",
  ContextPreviousPostId = "context___previousPostId",
  ContextNextPostId = "context___nextPostId",
  PluginCreatorId = "pluginCreator___id",
  PluginCreatorParentId = "pluginCreator___parent___id",
  PluginCreatorParentParentId = "pluginCreator___parent___parent___id",
  PluginCreatorParentParentChildren = "pluginCreator___parent___parent___children",
  PluginCreatorParentChildren = "pluginCreator___parent___children",
  PluginCreatorParentChildrenId = "pluginCreator___parent___children___id",
  PluginCreatorParentChildrenChildren = "pluginCreator___parent___children___children",
  PluginCreatorParentInternalContent = "pluginCreator___parent___internal___content",
  PluginCreatorParentInternalContentDigest = "pluginCreator___parent___internal___contentDigest",
  PluginCreatorParentInternalDescription = "pluginCreator___parent___internal___description",
  PluginCreatorParentInternalFieldOwners = "pluginCreator___parent___internal___fieldOwners",
  PluginCreatorParentInternalIgnoreType = "pluginCreator___parent___internal___ignoreType",
  PluginCreatorParentInternalMediaType = "pluginCreator___parent___internal___mediaType",
  PluginCreatorParentInternalOwner = "pluginCreator___parent___internal___owner",
  PluginCreatorParentInternalType = "pluginCreator___parent___internal___type",
  PluginCreatorChildren = "pluginCreator___children",
  PluginCreatorChildrenId = "pluginCreator___children___id",
  PluginCreatorChildrenParentId = "pluginCreator___children___parent___id",
  PluginCreatorChildrenParentChildren = "pluginCreator___children___parent___children",
  PluginCreatorChildrenChildren = "pluginCreator___children___children",
  PluginCreatorChildrenChildrenId = "pluginCreator___children___children___id",
  PluginCreatorChildrenChildrenChildren = "pluginCreator___children___children___children",
  PluginCreatorChildrenInternalContent = "pluginCreator___children___internal___content",
  PluginCreatorChildrenInternalContentDigest = "pluginCreator___children___internal___contentDigest",
  PluginCreatorChildrenInternalDescription = "pluginCreator___children___internal___description",
  PluginCreatorChildrenInternalFieldOwners = "pluginCreator___children___internal___fieldOwners",
  PluginCreatorChildrenInternalIgnoreType = "pluginCreator___children___internal___ignoreType",
  PluginCreatorChildrenInternalMediaType = "pluginCreator___children___internal___mediaType",
  PluginCreatorChildrenInternalOwner = "pluginCreator___children___internal___owner",
  PluginCreatorChildrenInternalType = "pluginCreator___children___internal___type",
  PluginCreatorInternalContent = "pluginCreator___internal___content",
  PluginCreatorInternalContentDigest = "pluginCreator___internal___contentDigest",
  PluginCreatorInternalDescription = "pluginCreator___internal___description",
  PluginCreatorInternalFieldOwners = "pluginCreator___internal___fieldOwners",
  PluginCreatorInternalIgnoreType = "pluginCreator___internal___ignoreType",
  PluginCreatorInternalMediaType = "pluginCreator___internal___mediaType",
  PluginCreatorInternalOwner = "pluginCreator___internal___owner",
  PluginCreatorInternalType = "pluginCreator___internal___type",
  PluginCreatorResolve = "pluginCreator___resolve",
  PluginCreatorName = "pluginCreator___name",
  PluginCreatorVersion = "pluginCreator___version",
  PluginCreatorPluginOptionsPlugins = "pluginCreator___pluginOptions___plugins",
  PluginCreatorPluginOptionsPluginsResolve = "pluginCreator___pluginOptions___plugins___resolve",
  PluginCreatorPluginOptionsPluginsId = "pluginCreator___pluginOptions___plugins___id",
  PluginCreatorPluginOptionsPluginsName = "pluginCreator___pluginOptions___plugins___name",
  PluginCreatorPluginOptionsPluginsVersion = "pluginCreator___pluginOptions___plugins___version",
  PluginCreatorPluginOptionsPluginsNodeApIs = "pluginCreator___pluginOptions___plugins___nodeAPIs",
  PluginCreatorPluginOptionsPluginsBrowserApIs = "pluginCreator___pluginOptions___plugins___browserAPIs",
  PluginCreatorPluginOptionsPluginsPluginFilepath = "pluginCreator___pluginOptions___plugins___pluginFilepath",
  PluginCreatorPluginOptionsTrackingIds = "pluginCreator___pluginOptions___trackingIds",
  PluginCreatorPluginOptionsPluginConfigHead = "pluginCreator___pluginOptions___pluginConfig___head",
  PluginCreatorPluginOptionsPath = "pluginCreator___pluginOptions___path",
  PluginCreatorPluginOptionsName = "pluginCreator___pluginOptions___name",
  PluginCreatorPluginOptionsMaxWidth = "pluginCreator___pluginOptions___maxWidth",
  PluginCreatorPluginOptionsWrapperStyle = "pluginCreator___pluginOptions___wrapperStyle",
  PluginCreatorPluginOptionsFigureClassName = "pluginCreator___pluginOptions___figureClassName",
  PluginCreatorPluginOptionsThemeDefault = "pluginCreator___pluginOptions___theme___default",
  PluginCreatorPluginOptionsShortName = "pluginCreator___pluginOptions___short_name",
  PluginCreatorPluginOptionsLang = "pluginCreator___pluginOptions___lang",
  PluginCreatorPluginOptionsStartUrl = "pluginCreator___pluginOptions___start_url",
  PluginCreatorPluginOptionsBackgroundColor = "pluginCreator___pluginOptions___background_color",
  PluginCreatorPluginOptionsThemeColor = "pluginCreator___pluginOptions___theme_color",
  PluginCreatorPluginOptionsDisplay = "pluginCreator___pluginOptions___display",
  PluginCreatorPluginOptionsIcon = "pluginCreator___pluginOptions___icon",
  PluginCreatorPluginOptionsCacheBustingMode = "pluginCreator___pluginOptions___cache_busting_mode",
  PluginCreatorPluginOptionsIncludeFavicon = "pluginCreator___pluginOptions___include_favicon",
  PluginCreatorPluginOptionsLegacy = "pluginCreator___pluginOptions___legacy",
  PluginCreatorPluginOptionsThemeColorInHead = "pluginCreator___pluginOptions___theme_color_in_head",
  PluginCreatorPluginOptionsCacheDigest = "pluginCreator___pluginOptions___cacheDigest",
  PluginCreatorPluginOptionsTailwind = "pluginCreator___pluginOptions___tailwind",
  PluginCreatorPluginOptionsDevelop = "pluginCreator___pluginOptions___develop",
  PluginCreatorPluginOptionsContent = "pluginCreator___pluginOptions___content",
  PluginCreatorPluginOptionsIgnore = "pluginCreator___pluginOptions___ignore",
  PluginCreatorPluginOptionsConfigDir = "pluginCreator___pluginOptions___configDir",
  PluginCreatorPluginOptionsProjectRoot = "pluginCreator___pluginOptions___projectRoot",
  PluginCreatorPluginOptionsPathCheck = "pluginCreator___pluginOptions___pathCheck",
  PluginCreatorPluginOptionsAllExtensions = "pluginCreator___pluginOptions___allExtensions",
  PluginCreatorPluginOptionsIsTsx = "pluginCreator___pluginOptions___isTSX",
  PluginCreatorPluginOptionsJsxPragma = "pluginCreator___pluginOptions___jsxPragma",
  PluginCreatorNodeApIs = "pluginCreator___nodeAPIs",
  PluginCreatorBrowserApIs = "pluginCreator___browserAPIs",
  PluginCreatorSsrApIs = "pluginCreator___ssrAPIs",
  PluginCreatorPluginFilepath = "pluginCreator___pluginFilepath",
  PluginCreatorPackageJsonName = "pluginCreator___packageJson___name",
  PluginCreatorPackageJsonDescription = "pluginCreator___packageJson___description",
  PluginCreatorPackageJsonVersion = "pluginCreator___packageJson___version",
  PluginCreatorPackageJsonMain = "pluginCreator___packageJson___main",
  PluginCreatorPackageJsonAuthor = "pluginCreator___packageJson___author",
  PluginCreatorPackageJsonLicense = "pluginCreator___packageJson___license",
  PluginCreatorPackageJsonDependencies = "pluginCreator___packageJson___dependencies",
  PluginCreatorPackageJsonDependenciesName = "pluginCreator___packageJson___dependencies___name",
  PluginCreatorPackageJsonDependenciesVersion = "pluginCreator___packageJson___dependencies___version",
  PluginCreatorPackageJsonDevDependencies = "pluginCreator___packageJson___devDependencies",
  PluginCreatorPackageJsonDevDependenciesName = "pluginCreator___packageJson___devDependencies___name",
  PluginCreatorPackageJsonDevDependenciesVersion = "pluginCreator___packageJson___devDependencies___version",
  PluginCreatorPackageJsonPeerDependencies = "pluginCreator___packageJson___peerDependencies",
  PluginCreatorPackageJsonPeerDependenciesName = "pluginCreator___packageJson___peerDependencies___name",
  PluginCreatorPackageJsonPeerDependenciesVersion = "pluginCreator___packageJson___peerDependencies___version",
  PluginCreatorPackageJsonKeywords = "pluginCreator___packageJson___keywords",
  PluginCreatorId = "pluginCreatorId",
  ComponentPath = "componentPath",
}

export type SitePageFilterInput = {
  path?: Maybe<StringQueryOperatorInput>
  component?: Maybe<StringQueryOperatorInput>
  internalComponentName?: Maybe<StringQueryOperatorInput>
  componentChunkName?: Maybe<StringQueryOperatorInput>
  matchPath?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  isCreatedByStatefulCreatePages?: Maybe<BooleanQueryOperatorInput>
  context?: Maybe<SitePageContextFilterInput>
  pluginCreator?: Maybe<SitePluginFilterInput>
  pluginCreatorId?: Maybe<StringQueryOperatorInput>
  componentPath?: Maybe<StringQueryOperatorInput>
}

export type SitePageGroupConnection = {
  __typename?: "SitePageGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<SitePageEdge>
  nodes: Array<SitePage>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SitePageSortInput = {
  fields?: Maybe<Array<Maybe<SitePageFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SitePlugin = Node & {
  __typename?: "SitePlugin"
  id: Scalars["ID"]
  parent?: Maybe<Node>
  children: Array<Node>
  internal: Internal
  resolve?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  pluginOptions?: Maybe<SitePluginPluginOptions>
  nodeAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  browserAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  ssrAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  pluginFilepath?: Maybe<Scalars["String"]>
  packageJson?: Maybe<SitePluginPackageJson>
}

export type SitePluginConnection = {
  __typename?: "SitePluginConnection"
  totalCount: Scalars["Int"]
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  distinct: Array<Scalars["String"]>
  group: Array<SitePluginGroupConnection>
}

export type SitePluginConnectionDistinctArgs = {
  field: SitePluginFieldsEnum
}

export type SitePluginConnectionGroupArgs = {
  skip?: Maybe<Scalars["Int"]>
  limit?: Maybe<Scalars["Int"]>
  field: SitePluginFieldsEnum
}

export type SitePluginEdge = {
  __typename?: "SitePluginEdge"
  next?: Maybe<SitePlugin>
  node: SitePlugin
  previous?: Maybe<SitePlugin>
}

export enum SitePluginFieldsEnum {
  Id = "id",
  ParentId = "parent___id",
  ParentParentId = "parent___parent___id",
  ParentParentParentId = "parent___parent___parent___id",
  ParentParentParentChildren = "parent___parent___parent___children",
  ParentParentChildren = "parent___parent___children",
  ParentParentChildrenId = "parent___parent___children___id",
  ParentParentChildrenChildren = "parent___parent___children___children",
  ParentParentInternalContent = "parent___parent___internal___content",
  ParentParentInternalContentDigest = "parent___parent___internal___contentDigest",
  ParentParentInternalDescription = "parent___parent___internal___description",
  ParentParentInternalFieldOwners = "parent___parent___internal___fieldOwners",
  ParentParentInternalIgnoreType = "parent___parent___internal___ignoreType",
  ParentParentInternalMediaType = "parent___parent___internal___mediaType",
  ParentParentInternalOwner = "parent___parent___internal___owner",
  ParentParentInternalType = "parent___parent___internal___type",
  ParentChildren = "parent___children",
  ParentChildrenId = "parent___children___id",
  ParentChildrenParentId = "parent___children___parent___id",
  ParentChildrenParentChildren = "parent___children___parent___children",
  ParentChildrenChildren = "parent___children___children",
  ParentChildrenChildrenId = "parent___children___children___id",
  ParentChildrenChildrenChildren = "parent___children___children___children",
  ParentChildrenInternalContent = "parent___children___internal___content",
  ParentChildrenInternalContentDigest = "parent___children___internal___contentDigest",
  ParentChildrenInternalDescription = "parent___children___internal___description",
  ParentChildrenInternalFieldOwners = "parent___children___internal___fieldOwners",
  ParentChildrenInternalIgnoreType = "parent___children___internal___ignoreType",
  ParentChildrenInternalMediaType = "parent___children___internal___mediaType",
  ParentChildrenInternalOwner = "parent___children___internal___owner",
  ParentChildrenInternalType = "parent___children___internal___type",
  ParentInternalContent = "parent___internal___content",
  ParentInternalContentDigest = "parent___internal___contentDigest",
  ParentInternalDescription = "parent___internal___description",
  ParentInternalFieldOwners = "parent___internal___fieldOwners",
  ParentInternalIgnoreType = "parent___internal___ignoreType",
  ParentInternalMediaType = "parent___internal___mediaType",
  ParentInternalOwner = "parent___internal___owner",
  ParentInternalType = "parent___internal___type",
  Children = "children",
  ChildrenId = "children___id",
  ChildrenParentId = "children___parent___id",
  ChildrenParentParentId = "children___parent___parent___id",
  ChildrenParentParentChildren = "children___parent___parent___children",
  ChildrenParentChildren = "children___parent___children",
  ChildrenParentChildrenId = "children___parent___children___id",
  ChildrenParentChildrenChildren = "children___parent___children___children",
  ChildrenParentInternalContent = "children___parent___internal___content",
  ChildrenParentInternalContentDigest = "children___parent___internal___contentDigest",
  ChildrenParentInternalDescription = "children___parent___internal___description",
  ChildrenParentInternalFieldOwners = "children___parent___internal___fieldOwners",
  ChildrenParentInternalIgnoreType = "children___parent___internal___ignoreType",
  ChildrenParentInternalMediaType = "children___parent___internal___mediaType",
  ChildrenParentInternalOwner = "children___parent___internal___owner",
  ChildrenParentInternalType = "children___parent___internal___type",
  ChildrenChildren = "children___children",
  ChildrenChildrenId = "children___children___id",
  ChildrenChildrenParentId = "children___children___parent___id",
  ChildrenChildrenParentChildren = "children___children___parent___children",
  ChildrenChildrenChildren = "children___children___children",
  ChildrenChildrenChildrenId = "children___children___children___id",
  ChildrenChildrenChildrenChildren = "children___children___children___children",
  ChildrenChildrenInternalContent = "children___children___internal___content",
  ChildrenChildrenInternalContentDigest = "children___children___internal___contentDigest",
  ChildrenChildrenInternalDescription = "children___children___internal___description",
  ChildrenChildrenInternalFieldOwners = "children___children___internal___fieldOwners",
  ChildrenChildrenInternalIgnoreType = "children___children___internal___ignoreType",
  ChildrenChildrenInternalMediaType = "children___children___internal___mediaType",
  ChildrenChildrenInternalOwner = "children___children___internal___owner",
  ChildrenChildrenInternalType = "children___children___internal___type",
  ChildrenInternalContent = "children___internal___content",
  ChildrenInternalContentDigest = "children___internal___contentDigest",
  ChildrenInternalDescription = "children___internal___description",
  ChildrenInternalFieldOwners = "children___internal___fieldOwners",
  ChildrenInternalIgnoreType = "children___internal___ignoreType",
  ChildrenInternalMediaType = "children___internal___mediaType",
  ChildrenInternalOwner = "children___internal___owner",
  ChildrenInternalType = "children___internal___type",
  InternalContent = "internal___content",
  InternalContentDigest = "internal___contentDigest",
  InternalDescription = "internal___description",
  InternalFieldOwners = "internal___fieldOwners",
  InternalIgnoreType = "internal___ignoreType",
  InternalMediaType = "internal___mediaType",
  InternalOwner = "internal___owner",
  InternalType = "internal___type",
  Resolve = "resolve",
  Name = "name",
  Version = "version",
  PluginOptionsPlugins = "pluginOptions___plugins",
  PluginOptionsPluginsResolve = "pluginOptions___plugins___resolve",
  PluginOptionsPluginsId = "pluginOptions___plugins___id",
  PluginOptionsPluginsName = "pluginOptions___plugins___name",
  PluginOptionsPluginsVersion = "pluginOptions___plugins___version",
  PluginOptionsPluginsPluginOptionsMaxWidth = "pluginOptions___plugins___pluginOptions___maxWidth",
  PluginOptionsPluginsPluginOptionsWrapperStyle = "pluginOptions___plugins___pluginOptions___wrapperStyle",
  PluginOptionsPluginsPluginOptionsFigureClassName = "pluginOptions___plugins___pluginOptions___figureClassName",
  PluginOptionsPluginsNodeApIs = "pluginOptions___plugins___nodeAPIs",
  PluginOptionsPluginsBrowserApIs = "pluginOptions___plugins___browserAPIs",
  PluginOptionsPluginsPluginFilepath = "pluginOptions___plugins___pluginFilepath",
  PluginOptionsTrackingIds = "pluginOptions___trackingIds",
  PluginOptionsPluginConfigHead = "pluginOptions___pluginConfig___head",
  PluginOptionsPath = "pluginOptions___path",
  PluginOptionsName = "pluginOptions___name",
  PluginOptionsMaxWidth = "pluginOptions___maxWidth",
  PluginOptionsWrapperStyle = "pluginOptions___wrapperStyle",
  PluginOptionsFigureClassName = "pluginOptions___figureClassName",
  PluginOptionsThemeDefault = "pluginOptions___theme___default",
  PluginOptionsThemeParentSelectorBodyNotDark = "pluginOptions___theme___parentSelector___body_not__dark_",
  PluginOptionsThemeParentSelectorBodyDark = "pluginOptions___theme___parentSelector___body_dark",
  PluginOptionsShortName = "pluginOptions___short_name",
  PluginOptionsLang = "pluginOptions___lang",
  PluginOptionsStartUrl = "pluginOptions___start_url",
  PluginOptionsBackgroundColor = "pluginOptions___background_color",
  PluginOptionsThemeColor = "pluginOptions___theme_color",
  PluginOptionsDisplay = "pluginOptions___display",
  PluginOptionsIcon = "pluginOptions___icon",
  PluginOptionsCacheBustingMode = "pluginOptions___cache_busting_mode",
  PluginOptionsIncludeFavicon = "pluginOptions___include_favicon",
  PluginOptionsLegacy = "pluginOptions___legacy",
  PluginOptionsThemeColorInHead = "pluginOptions___theme_color_in_head",
  PluginOptionsCacheDigest = "pluginOptions___cacheDigest",
  PluginOptionsTailwind = "pluginOptions___tailwind",
  PluginOptionsDevelop = "pluginOptions___develop",
  PluginOptionsContent = "pluginOptions___content",
  PluginOptionsIgnore = "pluginOptions___ignore",
  PluginOptionsConfigDir = "pluginOptions___configDir",
  PluginOptionsProjectRoot = "pluginOptions___projectRoot",
  PluginOptionsPathCheck = "pluginOptions___pathCheck",
  PluginOptionsAllExtensions = "pluginOptions___allExtensions",
  PluginOptionsIsTsx = "pluginOptions___isTSX",
  PluginOptionsJsxPragma = "pluginOptions___jsxPragma",
  NodeApIs = "nodeAPIs",
  BrowserApIs = "browserAPIs",
  SsrApIs = "ssrAPIs",
  PluginFilepath = "pluginFilepath",
  PackageJsonName = "packageJson___name",
  PackageJsonDescription = "packageJson___description",
  PackageJsonVersion = "packageJson___version",
  PackageJsonMain = "packageJson___main",
  PackageJsonAuthor = "packageJson___author",
  PackageJsonLicense = "packageJson___license",
  PackageJsonDependencies = "packageJson___dependencies",
  PackageJsonDependenciesName = "packageJson___dependencies___name",
  PackageJsonDependenciesVersion = "packageJson___dependencies___version",
  PackageJsonDevDependencies = "packageJson___devDependencies",
  PackageJsonDevDependenciesName = "packageJson___devDependencies___name",
  PackageJsonDevDependenciesVersion = "packageJson___devDependencies___version",
  PackageJsonPeerDependencies = "packageJson___peerDependencies",
  PackageJsonPeerDependenciesName = "packageJson___peerDependencies___name",
  PackageJsonPeerDependenciesVersion = "packageJson___peerDependencies___version",
  PackageJsonKeywords = "packageJson___keywords",
}

export type SitePluginFilterInput = {
  id?: Maybe<StringQueryOperatorInput>
  parent?: Maybe<NodeFilterInput>
  children?: Maybe<NodeFilterListInput>
  internal?: Maybe<InternalFilterInput>
  resolve?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  ssrAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
  packageJson?: Maybe<SitePluginPackageJsonFilterInput>
}

export type SitePluginGroupConnection = {
  __typename?: "SitePluginGroupConnection"
  totalCount: Scalars["Int"]
  edges: Array<SitePluginEdge>
  nodes: Array<SitePlugin>
  pageInfo: PageInfo
  field: Scalars["String"]
  fieldValue?: Maybe<Scalars["String"]>
}

export type SitePluginPackageJson = {
  __typename?: "SitePluginPackageJson"
  name?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  main?: Maybe<Scalars["String"]>
  author?: Maybe<Scalars["String"]>
  license?: Maybe<Scalars["String"]>
  dependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDependencies>>>
  devDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonDevDependencies>>>
  peerDependencies?: Maybe<Array<Maybe<SitePluginPackageJsonPeerDependencies>>>
  keywords?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type SitePluginPackageJsonDependencies = {
  __typename?: "SitePluginPackageJsonDependencies"
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type SitePluginPackageJsonDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDependenciesFilterInput>
}

export type SitePluginPackageJsonDevDependencies = {
  __typename?: "SitePluginPackageJsonDevDependencies"
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type SitePluginPackageJsonDevDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonDevDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonDevDependenciesFilterInput>
}

export type SitePluginPackageJsonFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  main?: Maybe<StringQueryOperatorInput>
  author?: Maybe<StringQueryOperatorInput>
  license?: Maybe<StringQueryOperatorInput>
  dependencies?: Maybe<SitePluginPackageJsonDependenciesFilterListInput>
  devDependencies?: Maybe<SitePluginPackageJsonDevDependenciesFilterListInput>
  peerDependencies?: Maybe<SitePluginPackageJsonPeerDependenciesFilterListInput>
  keywords?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependencies = {
  __typename?: "SitePluginPackageJsonPeerDependencies"
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
}

export type SitePluginPackageJsonPeerDependenciesFilterInput = {
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPackageJsonPeerDependenciesFilterListInput = {
  elemMatch?: Maybe<SitePluginPackageJsonPeerDependenciesFilterInput>
}

export type SitePluginPluginOptions = {
  __typename?: "SitePluginPluginOptions"
  plugins?: Maybe<Array<Maybe<SitePluginPluginOptionsPlugins>>>
  trackingIds?: Maybe<Array<Maybe<Scalars["String"]>>>
  pluginConfig?: Maybe<SitePluginPluginOptionsPluginConfig>
  path?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  maxWidth?: Maybe<Scalars["Int"]>
  wrapperStyle?: Maybe<Scalars["String"]>
  figureClassName?: Maybe<Scalars["String"]>
  theme?: Maybe<SitePluginPluginOptionsTheme>
  short_name?: Maybe<Scalars["String"]>
  lang?: Maybe<Scalars["String"]>
  start_url?: Maybe<Scalars["String"]>
  background_color?: Maybe<Scalars["String"]>
  theme_color?: Maybe<Scalars["String"]>
  display?: Maybe<Scalars["String"]>
  icon?: Maybe<Scalars["String"]>
  cache_busting_mode?: Maybe<Scalars["String"]>
  include_favicon?: Maybe<Scalars["Boolean"]>
  legacy?: Maybe<Scalars["Boolean"]>
  theme_color_in_head?: Maybe<Scalars["Boolean"]>
  cacheDigest?: Maybe<Scalars["String"]>
  tailwind?: Maybe<Scalars["Boolean"]>
  develop?: Maybe<Scalars["Boolean"]>
  content?: Maybe<Array<Maybe<Scalars["String"]>>>
  ignore?: Maybe<Array<Maybe<Scalars["String"]>>>
  configDir?: Maybe<Scalars["String"]>
  projectRoot?: Maybe<Scalars["String"]>
  pathCheck?: Maybe<Scalars["Boolean"]>
  allExtensions?: Maybe<Scalars["Boolean"]>
  isTSX?: Maybe<Scalars["Boolean"]>
  jsxPragma?: Maybe<Scalars["String"]>
}

export type SitePluginPluginOptionsFilterInput = {
  plugins?: Maybe<SitePluginPluginOptionsPluginsFilterListInput>
  trackingIds?: Maybe<StringQueryOperatorInput>
  pluginConfig?: Maybe<SitePluginPluginOptionsPluginConfigFilterInput>
  path?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  maxWidth?: Maybe<IntQueryOperatorInput>
  wrapperStyle?: Maybe<StringQueryOperatorInput>
  figureClassName?: Maybe<StringQueryOperatorInput>
  theme?: Maybe<SitePluginPluginOptionsThemeFilterInput>
  short_name?: Maybe<StringQueryOperatorInput>
  lang?: Maybe<StringQueryOperatorInput>
  start_url?: Maybe<StringQueryOperatorInput>
  background_color?: Maybe<StringQueryOperatorInput>
  theme_color?: Maybe<StringQueryOperatorInput>
  display?: Maybe<StringQueryOperatorInput>
  icon?: Maybe<StringQueryOperatorInput>
  cache_busting_mode?: Maybe<StringQueryOperatorInput>
  include_favicon?: Maybe<BooleanQueryOperatorInput>
  legacy?: Maybe<BooleanQueryOperatorInput>
  theme_color_in_head?: Maybe<BooleanQueryOperatorInput>
  cacheDigest?: Maybe<StringQueryOperatorInput>
  tailwind?: Maybe<BooleanQueryOperatorInput>
  develop?: Maybe<BooleanQueryOperatorInput>
  content?: Maybe<StringQueryOperatorInput>
  ignore?: Maybe<StringQueryOperatorInput>
  configDir?: Maybe<StringQueryOperatorInput>
  projectRoot?: Maybe<StringQueryOperatorInput>
  pathCheck?: Maybe<BooleanQueryOperatorInput>
  allExtensions?: Maybe<BooleanQueryOperatorInput>
  isTSX?: Maybe<BooleanQueryOperatorInput>
  jsxPragma?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginConfig = {
  __typename?: "SitePluginPluginOptionsPluginConfig"
  head?: Maybe<Scalars["Boolean"]>
}

export type SitePluginPluginOptionsPluginConfigFilterInput = {
  head?: Maybe<BooleanQueryOperatorInput>
}

export type SitePluginPluginOptionsPlugins = {
  __typename?: "SitePluginPluginOptionsPlugins"
  resolve?: Maybe<Scalars["String"]>
  id?: Maybe<Scalars["String"]>
  name?: Maybe<Scalars["String"]>
  version?: Maybe<Scalars["String"]>
  pluginOptions?: Maybe<SitePluginPluginOptionsPluginsPluginOptions>
  nodeAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  browserAPIs?: Maybe<Array<Maybe<Scalars["String"]>>>
  pluginFilepath?: Maybe<Scalars["String"]>
}

export type SitePluginPluginOptionsPluginsFilterInput = {
  resolve?: Maybe<StringQueryOperatorInput>
  id?: Maybe<StringQueryOperatorInput>
  name?: Maybe<StringQueryOperatorInput>
  version?: Maybe<StringQueryOperatorInput>
  pluginOptions?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsFilterInput>
  nodeAPIs?: Maybe<StringQueryOperatorInput>
  browserAPIs?: Maybe<StringQueryOperatorInput>
  pluginFilepath?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsPluginsFilterListInput = {
  elemMatch?: Maybe<SitePluginPluginOptionsPluginsFilterInput>
}

export type SitePluginPluginOptionsPluginsPluginOptions = {
  __typename?: "SitePluginPluginOptionsPluginsPluginOptions"
  maxWidth?: Maybe<Scalars["Int"]>
  wrapperStyle?: Maybe<Scalars["String"]>
  figureClassName?: Maybe<Scalars["String"]>
  theme?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsTheme>
}

export type SitePluginPluginOptionsPluginsPluginOptionsFilterInput = {
  maxWidth?: Maybe<IntQueryOperatorInput>
  wrapperStyle?: Maybe<StringQueryOperatorInput>
  figureClassName?: Maybe<StringQueryOperatorInput>
  theme?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsThemeFilterInput>
}

export type SitePluginPluginOptionsPluginsPluginOptionsTheme = {
  __typename?: "SitePluginPluginOptionsPluginsPluginOptionsTheme"
  default?: Maybe<Scalars["String"]>
  parentSelector?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsThemeParentSelector>
}

export type SitePluginPluginOptionsPluginsPluginOptionsThemeFilterInput = {
  default?: Maybe<StringQueryOperatorInput>
  parentSelector?: Maybe<SitePluginPluginOptionsPluginsPluginOptionsThemeParentSelectorFilterInput>
}

export type SitePluginPluginOptionsPluginsPluginOptionsThemeParentSelector = {
  __typename?: "SitePluginPluginOptionsPluginsPluginOptionsThemeParentSelector"
  body_not__dark_?: Maybe<Scalars["String"]>
  body_dark?: Maybe<Scalars["String"]>
}

export type SitePluginPluginOptionsPluginsPluginOptionsThemeParentSelectorFilterInput = {
  body_not__dark_?: Maybe<StringQueryOperatorInput>
  body_dark?: Maybe<StringQueryOperatorInput>
}

export type SitePluginPluginOptionsTheme = {
  __typename?: "SitePluginPluginOptionsTheme"
  default?: Maybe<Scalars["String"]>
  parentSelector?: Maybe<SitePluginPluginOptionsThemeParentSelector>
}

export type SitePluginPluginOptionsThemeFilterInput = {
  default?: Maybe<StringQueryOperatorInput>
  parentSelector?: Maybe<SitePluginPluginOptionsThemeParentSelectorFilterInput>
}

export type SitePluginPluginOptionsThemeParentSelector = {
  __typename?: "SitePluginPluginOptionsThemeParentSelector"
  body_not__dark_?: Maybe<Scalars["String"]>
  body_dark?: Maybe<Scalars["String"]>
}

export type SitePluginPluginOptionsThemeParentSelectorFilterInput = {
  body_not__dark_?: Maybe<StringQueryOperatorInput>
  body_dark?: Maybe<StringQueryOperatorInput>
}

export type SitePluginSortInput = {
  fields?: Maybe<Array<Maybe<SitePluginFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type SiteSiteMetadata = {
  __typename?: "SiteSiteMetadata"
  title?: Maybe<Scalars["String"]>
  description?: Maybe<Scalars["String"]>
  author?: Maybe<Author>
  siteUrl?: Maybe<Scalars["String"]>
  social?: Maybe<Social>
  keywords?: Maybe<Array<Maybe<Scalars["String"]>>>
}

export type SiteSiteMetadataFilterInput = {
  title?: Maybe<StringQueryOperatorInput>
  description?: Maybe<StringQueryOperatorInput>
  author?: Maybe<AuthorFilterInput>
  siteUrl?: Maybe<StringQueryOperatorInput>
  social?: Maybe<SocialFilterInput>
  keywords?: Maybe<StringQueryOperatorInput>
}

export type SiteSortInput = {
  fields?: Maybe<Array<Maybe<SiteFieldsEnum>>>
  order?: Maybe<Array<Maybe<SortOrderEnum>>>
}

export type Social = {
  __typename?: "Social"
  twitter?: Maybe<Scalars["String"]>
}

export type SocialFilterInput = {
  twitter?: Maybe<StringQueryOperatorInput>
}

export enum SortOrderEnum {
  Asc = "ASC",
  Desc = "DESC",
}

export type StringQueryOperatorInput = {
  eq?: Maybe<Scalars["String"]>
  ne?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Maybe<Scalars["String"]>>>
  nin?: Maybe<Array<Maybe<Scalars["String"]>>>
  regex?: Maybe<Scalars["String"]>
  glob?: Maybe<Scalars["String"]>
}

export type TransformOptions = {
  grayscale?: Maybe<Scalars["Boolean"]>
  duotone?: Maybe<DuotoneGradient>
  rotate?: Maybe<Scalars["Int"]>
  trim?: Maybe<Scalars["Float"]>
  cropFocus?: Maybe<ImageCropFocus>
  fit?: Maybe<ImageFit>
}

export type WebPOptions = {
  quality?: Maybe<Scalars["Int"]>
}

export type GatsbyImageSharpFixedFragment = {
  __typename?: "ImageSharpFixed"
} & Pick<ImageSharpFixed, "base64" | "width" | "height" | "src" | "srcSet">

export type GatsbyImageSharpFixed_TracedSvgFragment = {
  __typename?: "ImageSharpFixed"
} & Pick<ImageSharpFixed, "tracedSVG" | "width" | "height" | "src" | "srcSet">

export type GatsbyImageSharpFixed_WithWebpFragment = {
  __typename?: "ImageSharpFixed"
} & Pick<
  ImageSharpFixed,
  "base64" | "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpFixed_WithWebp_TracedSvgFragment = {
  __typename?: "ImageSharpFixed"
} & Pick<
  ImageSharpFixed,
  "tracedSVG" | "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpFixed_NoBase64Fragment = {
  __typename?: "ImageSharpFixed"
} & Pick<ImageSharpFixed, "width" | "height" | "src" | "srcSet">

export type GatsbyImageSharpFixed_WithWebp_NoBase64Fragment = {
  __typename?: "ImageSharpFixed"
} & Pick<
  ImageSharpFixed,
  "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpFluidFragment = {
  __typename?: "ImageSharpFluid"
} & Pick<ImageSharpFluid, "base64" | "aspectRatio" | "src" | "srcSet" | "sizes">

export type GatsbyImageSharpFluidLimitPresentationSizeFragment = {
  __typename?: "ImageSharpFluid"
} & {
  maxHeight: ImageSharpFluid["presentationHeight"]
  maxWidth: ImageSharpFluid["presentationWidth"]
}

export type GatsbyImageSharpFluid_TracedSvgFragment = {
  __typename?: "ImageSharpFluid"
} & Pick<
  ImageSharpFluid,
  "tracedSVG" | "aspectRatio" | "src" | "srcSet" | "sizes"
>

export type GatsbyImageSharpFluid_WithWebpFragment = {
  __typename?: "ImageSharpFluid"
} & Pick<
  ImageSharpFluid,
  | "base64"
  | "aspectRatio"
  | "src"
  | "srcSet"
  | "srcWebp"
  | "srcSetWebp"
  | "sizes"
>

export type GatsbyImageSharpFluid_WithWebp_TracedSvgFragment = {
  __typename?: "ImageSharpFluid"
} & Pick<
  ImageSharpFluid,
  | "tracedSVG"
  | "aspectRatio"
  | "src"
  | "srcSet"
  | "srcWebp"
  | "srcSetWebp"
  | "sizes"
>

export type GatsbyImageSharpFluid_NoBase64Fragment = {
  __typename?: "ImageSharpFluid"
} & Pick<ImageSharpFluid, "aspectRatio" | "src" | "srcSet" | "sizes">

export type GatsbyImageSharpFluid_WithWebp_NoBase64Fragment = {
  __typename?: "ImageSharpFluid"
} & Pick<
  ImageSharpFluid,
  "aspectRatio" | "src" | "srcSet" | "srcWebp" | "srcSetWebp" | "sizes"
>

export type GatsbyImageSharpResolutionsFragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<
  ImageSharpResolutions,
  "base64" | "width" | "height" | "src" | "srcSet"
>

export type GatsbyImageSharpResolutions_TracedSvgFragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<
  ImageSharpResolutions,
  "tracedSVG" | "width" | "height" | "src" | "srcSet"
>

export type GatsbyImageSharpResolutions_WithWebpFragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<
  ImageSharpResolutions,
  "base64" | "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpResolutions_WithWebp_TracedSvgFragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<
  ImageSharpResolutions,
  "tracedSVG" | "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpResolutions_NoBase64Fragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<ImageSharpResolutions, "width" | "height" | "src" | "srcSet">

export type GatsbyImageSharpResolutions_WithWebp_NoBase64Fragment = {
  __typename?: "ImageSharpResolutions"
} & Pick<
  ImageSharpResolutions,
  "width" | "height" | "src" | "srcSet" | "srcWebp" | "srcSetWebp"
>

export type GatsbyImageSharpSizesFragment = {
  __typename?: "ImageSharpSizes"
} & Pick<ImageSharpSizes, "base64" | "aspectRatio" | "src" | "srcSet" | "sizes">

export type GatsbyImageSharpSizes_TracedSvgFragment = {
  __typename?: "ImageSharpSizes"
} & Pick<
  ImageSharpSizes,
  "tracedSVG" | "aspectRatio" | "src" | "srcSet" | "sizes"
>

export type GatsbyImageSharpSizes_WithWebpFragment = {
  __typename?: "ImageSharpSizes"
} & Pick<
  ImageSharpSizes,
  | "base64"
  | "aspectRatio"
  | "src"
  | "srcSet"
  | "srcWebp"
  | "srcSetWebp"
  | "sizes"
>

export type GatsbyImageSharpSizes_WithWebp_TracedSvgFragment = {
  __typename?: "ImageSharpSizes"
} & Pick<
  ImageSharpSizes,
  | "tracedSVG"
  | "aspectRatio"
  | "src"
  | "srcSet"
  | "srcWebp"
  | "srcSetWebp"
  | "sizes"
>

export type GatsbyImageSharpSizes_NoBase64Fragment = {
  __typename?: "ImageSharpSizes"
} & Pick<ImageSharpSizes, "aspectRatio" | "src" | "srcSet" | "sizes">

export type GatsbyImageSharpSizes_WithWebp_NoBase64Fragment = {
  __typename?: "ImageSharpSizes"
} & Pick<
  ImageSharpSizes,
  "aspectRatio" | "src" | "srcSet" | "srcWebp" | "srcSetWebp" | "sizes"
>

export type CreatePageQueryVariables = Exact<{ [key: string]: never }>

export type CreatePageQuery = { __typename?: "Query" } & {
  allMarkdownRemark: { __typename?: "MarkdownRemarkConnection" } & {
    nodes: Array<
      { __typename?: "MarkdownRemark" } & Pick<MarkdownRemark, "id"> & {
          fields?: Maybe<{ __typename?: "Fields" } & Pick<Fields, "slug">>
        }
    >
  }
}

export type BioQueryVariables = Exact<{ [key: string]: never }>

export type BioQuery = { __typename?: "Query" } & {
  avatar?: Maybe<
    { __typename?: "File" } & {
      childImageSharp?: Maybe<
        { __typename?: "ImageSharp" } & {
          fixed?: Maybe<
            { __typename?: "ImageSharpFixed" } & GatsbyImageSharpFixedFragment
          >
        }
      >
    }
  >
  site?: Maybe<
    { __typename?: "Site" } & {
      siteMetadata?: Maybe<
        { __typename?: "SiteSiteMetadata" } & {
          author?: Maybe<
            { __typename?: "Author" } & Pick<Author, "name" | "summary">
          >
          social?: Maybe<{ __typename?: "Social" } & Pick<Social, "twitter">>
        }
      >
    }
  >
}

export type SeoQueryVariables = Exact<{ [key: string]: never }>

export type SeoQuery = { __typename?: "Query" } & {
  site?: Maybe<
    { __typename?: "Site" } & {
      siteMetadata?: Maybe<
        { __typename?: "SiteSiteMetadata" } & Pick<
          SiteSiteMetadata,
          "title" | "description" | "keywords" | "siteUrl"
        > & {
            social?: Maybe<{ __typename?: "Social" } & Pick<Social, "twitter">>
          }
      >
    }
  >
}

export type NotFoundQueryVariables = Exact<{ [key: string]: never }>

export type NotFoundQuery = { __typename?: "Query" } & {
  site?: Maybe<
    { __typename?: "Site" } & {
      siteMetadata?: Maybe<
        { __typename?: "SiteSiteMetadata" } & Pick<SiteSiteMetadata, "title">
      >
    }
  >
}

export type BlogIndexQueryVariables = Exact<{ [key: string]: never }>

export type BlogIndexQuery = { __typename?: "Query" } & {
  site?: Maybe<
    { __typename?: "Site" } & {
      siteMetadata?: Maybe<
        { __typename?: "SiteSiteMetadata" } & Pick<SiteSiteMetadata, "title">
      >
    }
  >
  allMarkdownRemark: { __typename?: "MarkdownRemarkConnection" } & {
    nodes: Array<
      { __typename?: "MarkdownRemark" } & {
        fields?: Maybe<{ __typename?: "Fields" } & Pick<Fields, "slug">>
        frontmatter?: Maybe<
          { __typename?: "Frontmatter" } & Pick<
            Frontmatter,
            "date" | "title" | "description"
          > & {
              image?: Maybe<
                { __typename?: "File" } & {
                  childImageSharp?: Maybe<
                    { __typename?: "ImageSharp" } & Pick<
                      ImageSharp,
                      "gatsbyImageData"
                    >
                  >
                }
              >
            }
        >
      }
    >
  }
}

export type BlogPostBySlugQueryVariables = Exact<{
  id: Scalars["String"]
  previousPostId?: Maybe<Scalars["String"]>
  nextPostId?: Maybe<Scalars["String"]>
}>

export type BlogPostBySlugQuery = { __typename?: "Query" } & {
  site?: Maybe<
    { __typename?: "Site" } & {
      siteMetadata?: Maybe<
        { __typename?: "SiteSiteMetadata" } & Pick<SiteSiteMetadata, "title">
      >
    }
  >
  markdownRemark?: Maybe<
    { __typename?: "MarkdownRemark" } & Pick<MarkdownRemark, "id" | "html"> & {
        frontmatter?: Maybe<
          { __typename?: "Frontmatter" } & Pick<
            Frontmatter,
            "title" | "date" | "description"
          > & {
              image?: Maybe<
                { __typename?: "File" } & {
                  childImageSharp?: Maybe<
                    { __typename?: "ImageSharp" } & {
                      resize?: Maybe<
                        { __typename?: "ImageSharpResize" } & Pick<
                          ImageSharpResize,
                          "src" | "height" | "width"
                        >
                      >
                    }
                  >
                }
              >
            }
        >
      }
  >
  previous?: Maybe<
    { __typename?: "MarkdownRemark" } & {
      fields?: Maybe<{ __typename?: "Fields" } & Pick<Fields, "slug">>
      frontmatter?: Maybe<
        { __typename?: "Frontmatter" } & Pick<Frontmatter, "title">
      >
    }
  >
  next?: Maybe<
    { __typename?: "MarkdownRemark" } & {
      fields?: Maybe<{ __typename?: "Fields" } & Pick<Fields, "slug">>
      frontmatter?: Maybe<
        { __typename?: "Frontmatter" } & Pick<Frontmatter, "title">
      >
    }
  >
}

export const GatsbyImageSharpFixedFragmentDoc = gql`
  fragment GatsbyImageSharpFixed on ImageSharpFixed {
    base64
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpFixed_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpFixed_tracedSVG on ImageSharpFixed {
    tracedSVG
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpFixed_WithWebpFragmentDoc = gql`
  fragment GatsbyImageSharpFixed_withWebp on ImageSharpFixed {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpFixed_WithWebp_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpFixed_withWebp_tracedSVG on ImageSharpFixed {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpFixed_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpFixed_noBase64 on ImageSharpFixed {
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpFixed_WithWebp_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpFixed_withWebp_noBase64 on ImageSharpFixed {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpFluidFragmentDoc = gql`
  fragment GatsbyImageSharpFluid on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpFluidLimitPresentationSizeFragmentDoc = gql`
  fragment GatsbyImageSharpFluidLimitPresentationSize on ImageSharpFluid {
    maxHeight: presentationHeight
    maxWidth: presentationWidth
  }
`
export const GatsbyImageSharpFluid_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpFluid_tracedSVG on ImageSharpFluid {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpFluid_WithWebpFragmentDoc = gql`
  fragment GatsbyImageSharpFluid_withWebp on ImageSharpFluid {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const GatsbyImageSharpFluid_WithWebp_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpFluid_withWebp_tracedSVG on ImageSharpFluid {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const GatsbyImageSharpFluid_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpFluid_noBase64 on ImageSharpFluid {
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpFluid_WithWebp_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpFluid_withWebp_noBase64 on ImageSharpFluid {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const GatsbyImageSharpResolutionsFragmentDoc = gql`
  fragment GatsbyImageSharpResolutions on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpResolutions_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpResolutions_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpResolutions_WithWebpFragmentDoc = gql`
  fragment GatsbyImageSharpResolutions_withWebp on ImageSharpResolutions {
    base64
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpResolutions_WithWebp_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpResolutions_withWebp_tracedSVG on ImageSharpResolutions {
    tracedSVG
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpResolutions_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpResolutions_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
  }
`
export const GatsbyImageSharpResolutions_WithWebp_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpResolutions_withWebp_noBase64 on ImageSharpResolutions {
    width
    height
    src
    srcSet
    srcWebp
    srcSetWebp
  }
`
export const GatsbyImageSharpSizesFragmentDoc = gql`
  fragment GatsbyImageSharpSizes on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpSizes_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpSizes_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpSizes_WithWebpFragmentDoc = gql`
  fragment GatsbyImageSharpSizes_withWebp on ImageSharpSizes {
    base64
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const GatsbyImageSharpSizes_WithWebp_TracedSvgFragmentDoc = gql`
  fragment GatsbyImageSharpSizes_withWebp_tracedSVG on ImageSharpSizes {
    tracedSVG
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const GatsbyImageSharpSizes_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpSizes_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    sizes
  }
`
export const GatsbyImageSharpSizes_WithWebp_NoBase64FragmentDoc = gql`
  fragment GatsbyImageSharpSizes_withWebp_noBase64 on ImageSharpSizes {
    aspectRatio
    src
    srcSet
    srcWebp
    srcSetWebp
    sizes
  }
`
export const CreatePageDocument = gql`
  query CreatePage {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: ASC }
      limit: 1000
    ) {
      nodes {
        id
        fields {
          slug
        }
      }
    }
  }
`

/**
 * __useCreatePageQuery__
 *
 * To run a query within a React component, call `useCreatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCreatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCreatePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCreatePageQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CreatePageQuery,
    CreatePageQueryVariables
  >
) {
  return Apollo.useQuery<CreatePageQuery, CreatePageQueryVariables>(
    CreatePageDocument,
    baseOptions
  )
}
export function useCreatePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CreatePageQuery,
    CreatePageQueryVariables
  >
) {
  return Apollo.useLazyQuery<CreatePageQuery, CreatePageQueryVariables>(
    CreatePageDocument,
    baseOptions
  )
}
export type CreatePageQueryHookResult = ReturnType<typeof useCreatePageQuery>
export type CreatePageLazyQueryHookResult = ReturnType<
  typeof useCreatePageLazyQuery
>
export type CreatePageQueryResult = Apollo.QueryResult<
  CreatePageQuery,
  CreatePageQueryVariables
>
export const BioDocument = gql`
  query Bio {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 50, height: 50, quality: 95) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author {
          name
          summary
        }
        social {
          twitter
        }
      }
    }
  }
  ${GatsbyImageSharpFixedFragmentDoc}
`

/**
 * __useBioQuery__
 *
 * To run a query within a React component, call `useBioQuery` and pass it any options that fit your needs.
 * When your component renders, `useBioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBioQuery({
 *   variables: {
 *   },
 * });
 */
export function useBioQuery(
  baseOptions?: Apollo.QueryHookOptions<BioQuery, BioQueryVariables>
) {
  return Apollo.useQuery<BioQuery, BioQueryVariables>(BioDocument, baseOptions)
}
export function useBioLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BioQuery, BioQueryVariables>
) {
  return Apollo.useLazyQuery<BioQuery, BioQueryVariables>(
    BioDocument,
    baseOptions
  )
}
export type BioQueryHookResult = ReturnType<typeof useBioQuery>
export type BioLazyQueryHookResult = ReturnType<typeof useBioLazyQuery>
export type BioQueryResult = Apollo.QueryResult<BioQuery, BioQueryVariables>
export const SeoDocument = gql`
  query Seo {
    site {
      siteMetadata {
        title
        description
        keywords
        social {
          twitter
        }
        siteUrl
      }
    }
  }
`

/**
 * __useSeoQuery__
 *
 * To run a query within a React component, call `useSeoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeoQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeoQuery(
  baseOptions?: Apollo.QueryHookOptions<SeoQuery, SeoQueryVariables>
) {
  return Apollo.useQuery<SeoQuery, SeoQueryVariables>(SeoDocument, baseOptions)
}
export function useSeoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SeoQuery, SeoQueryVariables>
) {
  return Apollo.useLazyQuery<SeoQuery, SeoQueryVariables>(
    SeoDocument,
    baseOptions
  )
}
export type SeoQueryHookResult = ReturnType<typeof useSeoQuery>
export type SeoLazyQueryHookResult = ReturnType<typeof useSeoLazyQuery>
export type SeoQueryResult = Apollo.QueryResult<SeoQuery, SeoQueryVariables>
export const NotFoundDocument = gql`
  query NotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`

/**
 * __useNotFoundQuery__
 *
 * To run a query within a React component, call `useNotFoundQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotFoundQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotFoundQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotFoundQuery(
  baseOptions?: Apollo.QueryHookOptions<NotFoundQuery, NotFoundQueryVariables>
) {
  return Apollo.useQuery<NotFoundQuery, NotFoundQueryVariables>(
    NotFoundDocument,
    baseOptions
  )
}
export function useNotFoundLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NotFoundQuery,
    NotFoundQueryVariables
  >
) {
  return Apollo.useLazyQuery<NotFoundQuery, NotFoundQueryVariables>(
    NotFoundDocument,
    baseOptions
  )
}
export type NotFoundQueryHookResult = ReturnType<typeof useNotFoundQuery>
export type NotFoundLazyQueryHookResult = ReturnType<
  typeof useNotFoundLazyQuery
>
export type NotFoundQueryResult = Apollo.QueryResult<
  NotFoundQuery,
  NotFoundQueryVariables
>
export const BlogIndexDocument = gql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          image: featured {
            childImageSharp {
              gatsbyImageData(
                width: 640
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`

/**
 * __useBlogIndexQuery__
 *
 * To run a query within a React component, call `useBlogIndexQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogIndexQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogIndexQuery({
 *   variables: {
 *   },
 * });
 */
export function useBlogIndexQuery(
  baseOptions?: Apollo.QueryHookOptions<BlogIndexQuery, BlogIndexQueryVariables>
) {
  return Apollo.useQuery<BlogIndexQuery, BlogIndexQueryVariables>(
    BlogIndexDocument,
    baseOptions
  )
}
export function useBlogIndexLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BlogIndexQuery,
    BlogIndexQueryVariables
  >
) {
  return Apollo.useLazyQuery<BlogIndexQuery, BlogIndexQueryVariables>(
    BlogIndexDocument,
    baseOptions
  )
}
export type BlogIndexQueryHookResult = ReturnType<typeof useBlogIndexQuery>
export type BlogIndexLazyQueryHookResult = ReturnType<
  typeof useBlogIndexLazyQuery
>
export type BlogIndexQueryResult = Apollo.QueryResult<
  BlogIndexQuery,
  BlogIndexQueryVariables
>
export const BlogPostBySlugDocument = gql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

/**
 * __useBlogPostBySlugQuery__
 *
 * To run a query within a React component, call `useBlogPostBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlogPostBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlogPostBySlugQuery({
 *   variables: {
 *      id: // value for 'id'
 *      previousPostId: // value for 'previousPostId'
 *      nextPostId: // value for 'nextPostId'
 *   },
 * });
 */
export function useBlogPostBySlugQuery(
  baseOptions: Apollo.QueryHookOptions<
    BlogPostBySlugQuery,
    BlogPostBySlugQueryVariables
  >
) {
  return Apollo.useQuery<BlogPostBySlugQuery, BlogPostBySlugQueryVariables>(
    BlogPostBySlugDocument,
    baseOptions
  )
}
export function useBlogPostBySlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BlogPostBySlugQuery,
    BlogPostBySlugQueryVariables
  >
) {
  return Apollo.useLazyQuery<BlogPostBySlugQuery, BlogPostBySlugQueryVariables>(
    BlogPostBySlugDocument,
    baseOptions
  )
}
export type BlogPostBySlugQueryHookResult = ReturnType<
  typeof useBlogPostBySlugQuery
>
export type BlogPostBySlugLazyQueryHookResult = ReturnType<
  typeof useBlogPostBySlugLazyQuery
>
export type BlogPostBySlugQueryResult = Apollo.QueryResult<
  BlogPostBySlugQuery,
  BlogPostBySlugQueryVariables
>
