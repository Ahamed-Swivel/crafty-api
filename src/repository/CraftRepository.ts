import { Craft, ICraft } from '../models/Craft'

class CraftRepository {
  public async createCraft(craftData: any): Promise<ICraft> {
    const craft = new Craft(craftData)
    await craft.save()
    return craft
  }

  public getCrafts(): Promise<ICraft[]> {
    return Craft.find({status: true})
  }

  public getCraftById(itemId: string): Promise<ICraft | null> {
    return Craft.findById(itemId)
  }

  public async disableCraft(itemId: string): Promise<ICraft | null> {
    let doc = await Craft.findById(itemId)

    if (doc) {
      doc.status = false
      await doc.save()
    }

    return doc
  }

  public updateCraftById(
    itemId: string,
    updateData: any
  ): Promise<ICraft | null> {
    return Craft.findByIdAndUpdate(itemId, updateData, { new: true })
  }
}

export default CraftRepository
