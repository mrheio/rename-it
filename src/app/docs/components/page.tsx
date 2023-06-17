import { Placeholder } from '@/assets/icons';
import { AppLink, Avatar, Button, Container, Input, Title } from '@/components';

const ComponentsDocs = () => {
    return (
        <main className="flex min-h-content flex-col gap-8 p-4 pt-navbar">
            <Title>Buttons</Title>
            <div className="flex flex-wrap gap-4">
                <Button>Click me</Button>
                <Button variant="secondary">Click me</Button>
                <Button variant="naked">Click me</Button>
                <Button outlined variant="primary">
                    Click me
                </Button>
                <Button outlined variant="secondary">
                    Click me
                </Button>
                <Button fluid>Click me</Button>
            </div>

            <Title weight="semibold">Links</Title>
            <div className="flex gap-4">
                <AppLink href="#">Lorem</AppLink>
                <AppLink weight="semibold" href="#">
                    Lorem
                </AppLink>
                <AppLink weight="semibold" variant="secondary" href="#">
                    Lorem
                </AppLink>
                <AppLink weight="semibold" underline href="#">
                    Lorem
                </AppLink>
                <AppLink weight="bold" variant="secondary" underline href="#">
                    Lorem
                </AppLink>
            </div>

            <Title variant="primary">Avatars</Title>
            <div className="flex gap-4">
                <Avatar>T</Avatar>
                <Avatar variant="secondary">T</Avatar>
                <Avatar variant="naked">T</Avatar>
            </div>

            <Title as="h2" variant="secondary" weight="bold">
                Inputs
            </Title>
            <div className="flex flex-wrap gap-4">
                <Input placeholder="Primary" />
                <Input variant="secondary" placeholder="Secondary" />
                <Input filled placeholder="Primary filled" />
                <Input
                    filled
                    variant="secondary"
                    placeholder="Secondary filled"
                />
                <Input filled variant="naked" placeholder="Naked filled" />
                <Input fluid placeholder="Primary" />
                <Input
                    decoration={{ end: <Placeholder /> }}
                    placeholder="Primary"
                />
                <Input
                    decoration={{
                        start: <Placeholder />,
                        end: <Placeholder />,
                    }}
                    placeholder="Primary"
                />
            </div>

            <Title as="h2" weight="bold">
                Container
            </Title>
            <Container outline>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis,
                optio accusantium adipisci quidem delectus possimus fugit id
                eum. Itaque, voluptas!
            </Container>
        </main>
    );
};

export default ComponentsDocs;
