import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface BetaEmailProps {
  name?: string;
  lastName?: string;
}

export default function BetaEmail({ name, lastName }: BetaEmailProps) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Preview>Bienvenido a la beta de Qiu</Preview>
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://res.cloudinary.com/dfuru6l6d/image/upload/v1743442686/Isologotipo_pqjcym.png"
                height="37"
                alt="Qiu Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Gracias{" "}
              <strong>
                {name} {lastName}
              </strong>{" "}
              por sumarte al a beta de <strong>Qiu</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hola {name},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Ya formas parte del grupo de los primeros usuarios que van a
              probar la Beta de <strong>Qiu!</strong>
            </Text>
            <Section>
              <Text className="text-black text-[14px] leading-[24px]">
                Te enviaremos un correo con el link para que puedas acceder a la
                Beta de Qiu en cuanto esté lista.
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                Mientras tanto, puedes seguirnos en nuestras redes sociales para
                estar al tanto todas de las novedades.
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Section className="text-center">
              <table className="w-full">
                <tr className="w-full">
                  <td align="center">
                    <Img
                      alt="Qiu"
                      height="42"
                      src="https://res.cloudinary.com/dfuru6l6d/image/upload/v1743442686/Isologotipo_pqjcym.png"
                    />
                  </td>
                </tr>
                <tr className="w-full">
                  <td align="center">
                    <Text className="my-[8px] text-[16px] font-semibold leading-[24px] text-gray-900">
                      Qiu Analytics
                    </Text>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Row className="table-cell h-[44px] w-[56px] align-bottom">
                      <Column className="pr-[8px]">
                        <Link href="#">
                          <Img
                            className="opacity-25"
                            alt="Discord"
                            height="36"
                            src="https://res.cloudinary.com/dfuru6l6d/image/upload/v1743442754/brand-discord_zldji6.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                      <Column className="pr-[8px]">
                        <Link href="https://x.com/QiuAnalitycs">
                          <Img
                            alt="X"
                            height="36"
                            src="https://react.email/static/x-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                      <Column>
                        <Link href="https://www.instagram.com/qiuanalitycs/?utm_source=ig_web_button_share_sheet">
                          <Img
                            alt="Instagram"
                            height="36"
                            src="https://react.email/static/instagram-logo.png"
                            width="36"
                          />
                        </Link>
                      </Column>
                    </Row>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <Text className="mb-0 mt-[4px] text-[16px] font-semibold leading-[24px] text-gray-500">
                      team@qiuanalitycs.com
                    </Text>
                  </td>
                </tr>
              </table>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

BetaEmail.PreviewProps = {
  name: "Ignacio",
  lastName: "Poletti",
} satisfies BetaEmailProps;
