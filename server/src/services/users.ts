// Imports
import SiteUser from "../db/entities/site_user";
import { CreateUserDto, UpdateUserDto } from "../interfaces/users";
import { AppDataSource } from "../config/db";
import hash from "../lib/hash";
import { NotFoundError, UnAuthorizedError } from "../lib/errors";
import getPaginationMetadata from "../lib/getPaginationMetadata";
import genApiFeatures from "../lib/genApiFeatures";
import { genVerifyToken } from "../lib/tokens";
import { sendVerifyMail } from "../lib/nodemailer";

// Reposetries
const siteUserRepo = AppDataSource.getRepository(SiteUser);

/**
 * Create User Service
 * @param {CreateUserDto} createUserDto
 */
export const createUserService = async (createUserDto: CreateUserDto) => {
  // Hash password
  createUserDto.password = await hash(createUserDto.password);

  // Insert user to database
  const user = await siteUserRepo
    .createQueryBuilder("site_user")
    .insert()
    .values(createUserDto)
    .returning("*")
    .execute();

  // Send verify mail
  const { verifyToken } = await genVerifyToken({ userId: user.raw[0].id });

  try {
    await sendVerifyMail(user.raw[0], verifyToken);
  } catch (error) {
    await siteUserRepo
      .createQueryBuilder("site_user")
      .delete()
      .where("site_user.id = :userId", { userId: user.raw[0].id })
      .execute();

    throw error;
  }

  return { user: user.raw[0] };
};

/**
 * Get User Service
 * @param {string} userId
 * @throws {NotFoundError} if user does not exist
 */
export const getUserService = async (userId: string) => {
  // Get user from database
  const user = await siteUserRepo
    .createQueryBuilder("site_user")
    .where("site_user.id = :userId", { userId })
    .getOne();

  // Throw error if user does not exist
  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  return { user };
};

/**
 * Get Many Users Service
 * @param {UsersFilterQuery} filterQuery
 * @throws {NotFoundError} if user does not exist
 */
export const getManyUsersService = async (filterQuery?: any) => {
  // Pagination
  const page = +filterQuery.page || 1;
  const limit = +filterQuery.limit || 10;
  filterQuery.page = page;
  filterQuery.limit = limit;

  // Generate API features
  const apiFeatures = await genApiFeatures(filterQuery);

  // Get Users
  const users = await siteUserRepo.findAndCount({
    where: { ...apiFeatures.where },
    order: apiFeatures.order,
    skip: apiFeatures.skip,
    take: apiFeatures.take,
  });

  return {
    metadata: getPaginationMetadata("/users", page, limit, users[0], users[1]),
    users: users[0],
  };
};

/**
 * Update user service
 * @param userId
 * @param {UpdateUserDto} updateUserDto
 * @throws {NotFoundError} if user does not exist
 */
export const updateUserService = async (
  userId: string,
  updateUserDto: UpdateUserDto,
  currentUser?: SiteUser
) => {
  // Throw error if not super admin want to update role
  if (currentUser?.role !== "super_admin") {
    if (updateUserDto.role) {
      throw new UnAuthorizedError("Restricted to super admin");
    }
  }

  // Get User
  const { user } = await getUserService(userId);

  if (updateUserDto.password) {
    updateUserDto.password = await hash(updateUserDto.password);
  }

  // Update And Save User
  Object.assign(user, updateUserDto);
  await siteUserRepo.save(user);

  return { user };
};

/**
 * Delete User Service
 * @param userId
 */
export const deleteUserService = async (userId: string) => {
  // Get User
  const { user } = await getUserService(userId);

  // Remove User And Save
  await siteUserRepo.remove(user);

  return;
};
