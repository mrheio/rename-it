import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const getRandomInt = ({ min = 0, max = 100 } = {}) => {
    return faker.number.int({ min, max });
};

const fakeModelDates = ({
    from = '2023-01-01T00:00:00.000Z',
    to = '2023-12-31T00:00:00.000Z',
} = {}) => {
    const created_at = faker.date
        .between({
            from,
            to,
        })
        .toISOString();

    const updated_at = faker.date
        .between({
            from: created_at,
            to,
        })
        .toISOString();

    const deleted_at = null;

    return [created_at, updated_at, deleted_at];
};

const fakeUser = () => {
    const id = uuidv4();
    const email = faker.internet.email();
    const username = faker.internet.userName();
    const password = faker.internet.password();
    const [created_at, updated_at, deleted_at] = fakeModelDates();

    return {
        id,
        email,
        username,
        password,
        created_at,
        updated_at,
        deleted_at,
    };
};

const fakeGroup = ({ users }) => {
    const id = uuidv4();
    const name = faker.word.words(faker.number.int({ min: 1, max: 4 }));
    const description = faker.lorem.paragraphs();
    const slug = name.replaceAll(' ', '-').toLowerCase();
    const [created_at, updated_at, deleted_at] = fakeModelDates();
    const owner = users[getRandomInt({ max: users.length - 1 })];
    const owner_id = owner.id;

    return {
        id,
        name,
        description,
        slug,
        created_at,
        updated_at,
        deleted_at,
        owner_id,
    };
};

const fakePost = ({ groups, users }) => {
    const id = uuidv4();
    const title = faker.word.words(faker.number.int({ min: 1, max: 4 }));
    const content = faker.lorem.paragraphs();
    const slug = title.replaceAll(' ', '-').toLowerCase();
    const [created_at, updated_at, deleted_at] = fakeModelDates();
    const group_id = groups[getRandomInt({ max: groups.length - 1 })].id;
    const created_by_id = users[getRandomInt({ max: users.length - 1 })].id;

    return {
        id,
        title,
        content,
        slug,
        created_at,
        updated_at,
        deleted_at,
        group_id,
        created_by_id,
    };
};

const fakeComment = ({ posts, users }) => {
    const id = uuidv4();
    const content = faker.lorem.paragraphs();
    const [created_at, updated_at, deleted_at] = fakeModelDates();
    const post_id = posts[getRandomInt({ max: posts.length - 1 })].id;
    const created_by_id = users[getRandomInt({ max: users.length - 1 })].id;

    return {
        id,
        content,
        created_at,
        updated_at,
        deleted_at,
        post_id,
        created_by_id,
    };
};

const generateFakeUsers = (count = 12) => {
    const users = [...Array(count)].map((x) => fakeUser());

    return users;
};

const generateFakeGroups = ({ count = 7, users }) => {
    const groups = [...Array(count)].map((x) => fakeGroup({ users }));

    return groups;
};

const generateFakePosts = ({ count = 32, groups, users }) => {
    const posts = [...Array(count)].map((x) => fakePost({ groups, users }));

    return posts;
};

const generateFakeComments = ({ count = 56, posts, users }) => {
    const comments = [...Array(count)].map((x) =>
        fakeComment({ posts, users })
    );

    return comments;
};

const generateData = () => {
    const users = generateFakeUsers();
    const groups = generateFakeGroups({ users });
    const posts = generateFakePosts({ groups, users });
    const comments = generateFakeComments({ posts, users });

    return { users, groups, posts, comments };
};

const main = async () => {
    console.log('Deleting old data...');

    const deleteCommentsTransaction = prisma.comment.deleteMany();
    const deletePostsTransaction = prisma.post.deleteMany();
    const deleteGroupsTransaction = prisma.group.deleteMany();
    const deleteUsersTransaction = prisma.user.deleteMany();

    await prisma.$transaction([
        deleteCommentsTransaction,
        deletePostsTransaction,
        deleteGroupsTransaction,
        deleteUsersTransaction,
    ]);

    console.log('Old data deleted');

    console.log('Generating new data...');

    const { users, groups, posts, comments } = generateData();

    console.log('New data generated');

    console.log('Inserting users...');

    const insertUsersResult = await prisma.user.createMany({ data: users });

    console.log('Users inserted');

    console.log('Inserting groups...');

    const insertGroupsResult = await prisma.group.createMany({ data: groups });

    console.log('Groups inserted');

    console.log('Inserting posts...');

    const insertPostsResult = await prisma.post.createMany({ data: posts });

    console.log('Posts inserted');

    console.log('Inserting comments...');

    const insertCommentsResult = await prisma.comment.createMany({
        data: comments,
    });

    console.log('Comments inserted');

    console.log('Data inserted');
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
