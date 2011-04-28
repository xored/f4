using [java]org.eclipse.core.filebuffers::IDocumentSetupParticipant
using [java]org.eclipse.jface.text::IDocument

/**
 * The document setup participant for Fan.
 */
class FanDocumentSetupParticipant : IDocumentSetupParticipant
{
  override Void setup(IDocument? document)
  {
    FanTextTools.instance.setupDocumentPartitioner(document,
      IFanPartitions.partitioning);
  }
}
