using [java] org.eclipse.ui::PlatformUI
using [java] org.eclipse.ui.texteditor::ITextEditorExtension3
using [java] org.eclipse.jface.text::DefaultIndentLineAutoEditStrategy
using [java] org.eclipse.jface.text::DocumentCommand
using [java] org.eclipse.jface.text::IDocument
using [java] org.eclipse.jface.text::IRegion
using [java] org.eclipse.jface.text::Region
using [java] org.eclipse.jface.text::TextUtilities
using [java] org.eclipse.dltk.core::IMember
using [java] org.eclipse.dltk.core::IMethod
using [java] org.eclipse.dltk.core::IModelElement
using [java] org.eclipse.dltk.core::IScriptProject
using [java] org.eclipse.dltk.core::ISourceModule
using [java] org.eclipse.dltk.core::IType
using [java] org.eclipse.dltk.core::ScriptModelUtil
using [java] org.eclipse.dltk.ui::DLTKUIPlugin

/**
 * @author kappa
 * 
 */
class FanDocAutoIndentStrategy : DefaultIndentLineAutoEditStrategy
{

  /** The partitioning that this strategy operates on. */
  private Str partitioning

  /**
   * Creates a new Javadoc auto indent strategy for the given document
   * partitioning.
   * 
   * @param partitioning
   *            the document partitioning
   */
  new make(Str partitioning)
  {
    this.partitioning = partitioning
  }

  /**
   * Copies the indentation of the previous line and adds a star. If the
   * Javadoc just started on this line add standard method tags and close the
   * Javadoc.
   * 
   * @param d
   *            the document to work on
   * @param c
   *            the command to deal with
   */
  private Void indentAfterNewLine(IDocument? d, DocumentCommand? c)
  {
    offset := c.offset
    if (offset == -1 || d.getLength == 0) return

    //try {
      p := offset == d.getLength() ? offset - 1 : offset
      line := d.getLineInformationOfOffset(p)

      lineOffset := line.getOffset
      firstNonWS := findEndOfWhiteSpace(d, lineOffset, offset)
      //Assert.isTrue(firstNonWS >= lineOffset,
      //    "indentation must not be negative"); //$NON-NLS-1$

      buf := StrBuf().add(c.text)
      prefix := findPrefixRange(d, line)
      indentation := d.get(prefix.getOffset, prefix.getLength)
      lengthToAdd := prefix.getLength.min(offset - prefix.getOffset)

      buf.add(indentation[0..lengthToAdd-1])

      if (firstNonWS < offset) {
        if (d.getChar(firstNonWS) == '*') {
          // Javadoc started on this line
          buf.add("* ")

          if (/*isPreferenceTrue(PreferenceConstants.EDITOR_CLOSE_JAVADOCS)&&*/isNewComment(d, offset))
          {
            c.shiftsCaret = false
            c.caretOffset = c.offset + buf.size
            lineDelimiter := TextUtilities.getDefaultLineDelimiter(d)

            eolOffset := lineOffset + line.getLength
            replacementLength := eolOffset - p
            restOfLine := d.get(p, replacementLength)
            endTag := lineDelimiter + indentation + " */"

            if (/*isPreferenceTrue(PreferenceConstants.EDITOR_ADD_JAVADOC_TAGS)*/true)
            {
              // we need to close the comment before computing
              // the correct tags in order to get the method
              d.replace(offset, replacementLength, endTag)

              // evaluate method signature
              unit := getSourceModule

              if (unit != null)
              {
                //try {
                  ScriptModelUtil.reconcile(unit)
                  string := createJavaDocTags(d, c, indentation, lineDelimiter, unit)
                  buf.add(restOfLine)
                  // only add tags if they are non-empty - the
                  // empty line has already been added above.
                  if (string.trim != "*")
                    buf.add(string)
                //} catch (CoreException e) {
                  // ignore
                //}
              }
            }
            else
            {
              c.length = replacementLength
              buf.add(restOfLine)
              buf.add(endTag)
            }
          }

        }
      }

      // move the caret behind the prefix, even if we do not have to
      // insert it.
      if (lengthToAdd < prefix.getLength())
        c.caretOffset = offset + prefix.getLength() - lengthToAdd;
      c.text = buf.toStr

    //} catch (BadLocationException excp) {
      // stop work
    //}
  }

//  /**
//   * Returns the value of the given boolean-typed preference.
//   * 
//   * @param preference
//   *            the preference to look up
//   * @return the value of the given preference in the Java plug-in's default
//   *         preference store
//   */
//  private boolean isPreferenceTrue(String preference) {
//    return DLTKUIPlugin.getDefault().getPreferenceStore().getBoolean(
//        preference);
//  }

  /**
   * Returns the range of the Javadoc prefix on the given line in
   * <code>document</code>. The prefix greedily matches the following regex
   * pattern: <code>\w*\*\w*</code>, that is, any number of whitespace
   * characters, followed by an asterisk ('*'), followed by any number of
   * whitespace characters.
   * 
   * @param document
   *            the document to which <code>line</code> refers
   * @param line
   *            the line from which to extract the prefix range
   * @return an <code>IRegion</code> describing the range of the prefix on the
   *         given line
   * @throws BadLocationException
   *             if accessing the document fails
   */
  private IRegion findPrefixRange(IDocument document, IRegion line)
  {
    lineOffset := line.getOffset
    lineEnd := lineOffset + line.getLength
    indentEnd := findEndOfWhiteSpace(document, lineOffset, lineEnd)
    if (indentEnd < lineEnd && document.getChar(indentEnd) == '*')
    {
      indentEnd++
      while (indentEnd < lineEnd && document.getChar(indentEnd) == ' ')
        indentEnd++
    }
    return Region(lineOffset, indentEnd - lineOffset)
  }

  /**
   * Creates the Javadoc tags for newly inserted comments.
   * 
   * @param document
   *            the document
   * @param command
   *            the command
   * @param indentation
   *            the base indentation to use
   * @param lineDelimiter
   *            the line delimiter to use
   * @param unit
   *            the compilation unit shown in the editor
   * @return the tags to add to the document
   * @throws CoreException
   *             if accessing the Java model fails
   * @throws BadLocationException
   *             if accessing the document fails
   */
  private Str createJavaDocTags(IDocument document, DocumentCommand command,
      Str indentation, Str lineDelimiter, ISourceModule unit)
  {
    element := unit.getElementAt(command.offset)
    if (element == null) return ""

    switch (element.getElementType)
    {
    case IModelElement.TYPE:
      return createTypeTags(document, command, indentation,
          lineDelimiter, element)

    case IModelElement.METHOD:
      return createMethodTags(document, command, indentation,
          lineDelimiter, element)

    default:
      return ""
    }
  }

  /**
   * Removes start and end of a comment and corrects indentation and line
   * delimiters.
   * 
   * @param comment
   *            the computed comment
   * @param indentation
   *            the base indentation
   * @param project
   *            the Java project for the formatter settings, or
   *            <code>null</code> for global preferences
   * @param lineDelimiter
   *            the line delimiter
   * @return a trimmed version of <code>comment</code>
   */
  private Str prepareTemplateComment(Str comment, Str indentation,
      IScriptProject project, Str lineDelimiter)
  {
    // trim comment start and end if any
    if (comment.endsWith("*/"))
      comment = comment[0..-3]
    comment = comment.trim
    if (comment.startsWith("/*"))
    {
      if (comment.size > 2 && comment[2] == '*')
        comment = comment[3..-1] // remove '/**'
      else
        comment = comment[2..-1] // remove '/*'
    }
    // trim leading spaces, but not new lines
    nonSpace := 0
    len := comment.size
    while (nonSpace < len && comment[nonSpace] == ' ' || comment[nonSpace] == '\t')
      nonSpace++
    comment = comment[nonSpace..-1]

    return comment;// Strings.changeIndent(comment, 0, project,
    // indentation,lineDelimiter);
  }

  private Str createTypeTags(IDocument document, DocumentCommand command,
      Str indentation, Str lineDelimiter, IType type)
  {
    // String[] typeParamNames = StubUtility.getTypeParameterNames(type
    // .getTypeParameters());
    comment := ""// CodeGeneration.getTypeComment(type.getSourceModule(),
    // type.getTypeQualifiedName("."), typeParamNames, lineDelimiter);
    //if (comment != null) {
      javadocComment := comment.startsWith("/**")
      if (!isFirstComment(document, command, type, javadocComment))
        return ""
      return prepareTemplateComment(comment.trim, indentation, type
          .getScriptProject, lineDelimiter)
    //}
    return ""
  }

  private Str createMethodTags(IDocument document, DocumentCommand command,
      Str indentation, Str lineDelimiter, IMethod method)
  {
    partition := TextUtilities.getPartition(document, partitioning, command.offset, false)
    // IMethod inheritedMethod = getInheritedMethod(method);
    comment := ""// CodeGeneration.getMethodComment(method,
    // inheritedMethod, lineDelimiter);
    //if (comment != null) {
      //comment = comment.trim();
      javadocComment := comment.startsWith("/**")
      if (!isFirstComment(document, command, method, javadocComment))
        return ""
      isJavaDoc := partition.getLength >= 3 && document.get(partition.getOffset, 3).equals("/**")
      if (javadocComment == isJavaDoc)
        return prepareTemplateComment(comment, indentation, method.getScriptProject, lineDelimiter)
    //}
    return ""
  }

  /**
   * Returns <code>true</code> if the comment being inserted at
   * <code>command.offset</code> is the first comment (the first Javadoc
   * comment if <code>ignoreJavadoc</code> is <code>true</code>) of the given
   * member.
   * <p>
   * see also https://bugs.eclipse.org/bugs/show_bug.cgi?id=55325 (don't add
   * parameters if the member already has a comment)
   * </p>
   * 
   * @param document
   *            the document
   * @param command
   *            the document command
   * @param member
   *            the Java member
   * @param ignoreNonJavadoc
   *            <code>true</code> if non Javadoc should be ignored
   * @return <code>true</code> if it is the first comment
   * @throws JavaModelException
   *             if accessing the Java model fails
   * @throws BadLocationException
   *             if accessing the document fails
   */
  private Bool isFirstComment(IDocument document, DocumentCommand command,
      IMember member, Bool ignoreNonJavadoc)
  {
    partition := TextUtilities.getPartition(document, partitioning, command.offset, false)
    sourceRange := member.getSourceRange
    if (sourceRange == null || sourceRange.getOffset != partition.getOffset)
      return false
    srcOffset := sourceRange.getOffset
    srcLength := sourceRange.getLength
    nameRelativeOffset := member.getNameRange().getOffset() - srcOffset
    partitionRelativeOffset := partition.getOffset() - srcOffset
    token := ignoreNonJavadoc ? "/**" : "/*"
    return document.get(srcOffset, srcLength).indexr(token,
        nameRelativeOffset) == partitionRelativeOffset
  }

  /**
   * Unindents a typed slash ('/') if it forms the end of a comment.
   * 
   * @param d
   *            the document
   * @param c
   *            the command
   */
  private Void indentAfterCommentEnd(IDocument d, DocumentCommand c)
  {
    if (c.offset < 2 || d.getLength == 0) return
    //try {
      if ("* " == d.get(c.offset - 2, 2)) {
        // modify document command
        c.length = c.length + 1
        c.offset = c.offset - 1
      }
    //} catch (BadLocationException excp) {
      // stop work
    //}
  }

  /**
   * Guesses if the command operates within a newly created Javadoc comment or
   * not. If in doubt, it will assume that the Javadoc is new.
   * 
   * @param document
   *            the document
   * @param commandOffset
   *            the command offset
   * @return <code>true</code> if the comment should be closed,
   *         <code>false</code> if not
   */
  private Bool isNewComment(IDocument document, Int commandOffset)
  {
    //try {
      lineIndex := document.getLineOfOffset(commandOffset) + 1
      if (lineIndex >= document.getNumberOfLines()) return true
      line := document.getLineInformation(lineIndex)
      partition := TextUtilities.getPartition(document, partitioning, commandOffset, false)
      partitionEnd := partition.getOffset + partition.getLength
      if (line.getOffset >= partitionEnd) return false

      if (document.getLength == partitionEnd)
        return true // partition goes to end of document - probably a
      // new comment

      comment := document.get(partition.getOffset, partition.getLength)
      if (comment.index("/*", 2) != null)
        return true // enclosed another comment -> probably a new
      // comment

      return false
    //} catch (BadLocationException e) {
    //  return false;
    //}
  }

  private Bool isSmartMode()
  {
    (DLTKUIPlugin.getActivePage?.getActiveEditor as ITextEditorExtension3)?.getInsertMode == ITextEditorExtension3.SMART_INSERT
  }

  /*
   * @see IAutoIndentStrategy#customizeDocumentCommand
   */
  override Void customizeDocumentCommand(IDocument? document, DocumentCommand? command)
  {
    if (!isSmartMode || command.text == null) return

    if (command.length == 0)
    {
      Str[] lineDelimiters := document.getLegalLineDelimiters
      Str? delim
      lineDelimiters.each {
        if (command.text.endsWith(it) && (delim == null || delim.size < it.size))
          delim = it
      }

      if (delim != null)
      {
        // ends with line delimiter
        if (delim == command.text)
          // just the line delimiter
          indentAfterNewLine(document, command)
        return
      }
    }

    if (command.text == "/")
      indentAfterCommentEnd(document, command)
  }

//  /**
//   * Returns the method inherited from, <code>null</code> if method is newly
//   * defined.
//   * 
//   * @param method
//   *            the method being written
//   * @return the ancestor method, or <code>null</code> if none
//   * @throws JavaModelException
//   *             if accessing the Java model fails
//   */
//  // private static IMethod getInheritedMethod(IMethod method)
//  // throws ModelException {
//  // IType declaringType = method.getDeclaringType();
//  // MethodOverrideTester tester = SuperTypeHierarchyCache
//  // .getMethodOverrideTester(declaringType);
//  // return tester.findOverriddenMethod(method, true);
//  // }

  /**
   * Returns the compilation unit of the compilation unit editor invoking the
   * <code>AutoIndentStrategy</code>, might return <code>null</code> on error.
   * 
   * @return the compilation unit represented by the document
   */
  private static ISourceModule? getSourceModule()
  {
    input := PlatformUI.getWorkbench.getActiveWorkbenchWindow?.getActivePage?.getActiveEditor?.getEditorInput
    if (input == null) return null
    return DLTKUIPlugin.getDefault.getWorkingCopyManager.getWorkingCopy(input)
  }
}
