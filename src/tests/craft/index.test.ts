import CraftRepository from '../../repository/CraftRepository';
import { ICraft } from '../../models/Craft';

// Mocking the Mongoose functions
jest.mock('../../models/Craft', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

describe('CraftRepository', () => {
  let craftRepository: CraftRepository;

  beforeEach(() => {
    craftRepository = new CraftRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCraft', () => {
    it('should create and save a new craft', async () => {
      const craftData = {
        title: 'Craft 1',
        description: 'Craft description',
        category: 'Craft category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        status: true,
      };

      const savedCraft: ICraft = {
        id: 'craft-id',
        ...craftData,
      };

      const craftSaveSpy = jest.spyOn(craftRepository, 'createCraft').mockResolvedValueOnce(savedCraft);

      const createdCraft = await craftRepository.createCraft(craftData);

      expect(craftSaveSpy).toHaveBeenCalledTimes(1);
      expect(createdCraft).toEqual(savedCraft);
    });
  });

  describe('getCrafts', () => {
    it('should return all crafts with status true', async () => {
      const expectedCrafts: ICraft[] = [
        {
          id: 'craft-1-id',
          title: 'Craft 1',
          description: 'Craft 1 description',
          category: 'Craft category',
          price: 10,
          imageUrl: 'image-url',
          availableQuantity: 5,
          status: true,
        },
        {
          id: 'craft-2-id',
          title: 'Craft 2',
          description: 'Craft 2 description',
          category: 'Craft category',
          price: 20,
          imageUrl: 'image-url',
          availableQuantity: 3,
          status: true,
        },
      ];

      jest.spyOn(craftRepository, 'getCrafts').mockResolvedValueOnce(expectedCrafts);

      const crafts = await craftRepository.getCrafts();

      expect(crafts).toEqual(expectedCrafts);
    });
  });

  describe('getCraftById', () => {
    it('should return a craft by ID', async () => {
      const craftId = 'craft-id';
      const expectedCraft: ICraft = {
        id: craftId,
        title: 'Craft 1',
        description: 'Craft 1 description',
        category: 'Craft category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        status: true,
      };

      jest.spyOn(craftRepository, 'getCraftById').mockResolvedValueOnce(expectedCraft);

      const craft = await craftRepository.getCraftById(craftId);

      expect(craft).toEqual(expectedCraft);
    });

    it('should return null if no craft found with the given ID', async () => {
      const craftId = 'non-existent-id';

      jest.spyOn(craftRepository, 'getCraftById').mockResolvedValueOnce(null);

      const craft = await craftRepository.getCraftById(craftId);

      expect(craft).toBeNull();
    });
  });

  describe('disableCraft', () => {
    it('should disable a craft by ID', async () => {
      const craftId = 'craft-id';
      const expectedCraft: ICraft = {
        id: craftId,
        title: 'Craft 1',
        description: 'Craft 1 description',
        category: 'Craft category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        status: false,
      };

      const findByIdSpy = jest.spyOn(craftRepository, 'disableCraft').mockResolvedValueOnce(expectedCraft);

      const disabledCraft = await craftRepository.disableCraft(craftId);

      expect(findByIdSpy).toHaveBeenCalledTimes(1);
      expect(disabledCraft).toEqual(expectedCraft);
      expect(expectedCraft.status).toBe(false);
    });

    it('should return null if no craft found with the given ID', async () => {
      const craftId = 'non-existent-id';

      jest.spyOn(craftRepository, 'disableCraft').mockResolvedValueOnce(null);

      const craft = await craftRepository.disableCraft(craftId);

      expect(craft).toBeNull();
    });
  });

  describe('updateCraftById', () => {
    it('should update a craft by ID', async () => {
      const craftId = 'craft-id';
      const updateData = {
        title: 'Updated Craft',
        description: 'Updated description',
      };

      const updatedCraft: ICraft = {
        id: craftId,
        title: 'Updated Craft',
        description: 'Updated description',
        category: 'Craft category',
        price: 10,
        imageUrl: 'image-url',
        availableQuantity: 5,
        status: true,
      };

      const findByIdAndUpdateSpy = jest.spyOn(craftRepository, 'updateCraftById').mockResolvedValueOnce(updatedCraft);

      const craft = await craftRepository.updateCraftById(craftId, updateData);

      expect(findByIdAndUpdateSpy).toHaveBeenCalledTimes(1);
      expect(craft).toEqual(updatedCraft);
    });

    it('should return null if no craft found with the given ID', async () => {
      const craftId = 'non-existent-id';
      const updateData = {
        title: 'Updated Craft',
        description: 'Updated description',
      };

      jest.spyOn(craftRepository, 'updateCraftById').mockResolvedValueOnce(null);

      const craft = await craftRepository.updateCraftById(craftId, updateData);

      expect(craft).toBeNull();
    });
  });
});
