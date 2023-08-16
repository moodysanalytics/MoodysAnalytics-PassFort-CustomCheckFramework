export type Doc = {
    name: string;
    href: string;
    description: string;
  };

export const docsList: Doc[] = [
    {
      name: "PassFort Integration Docs",
      href: "https://passfort.github.io/integration-docs/?javascript#introduction",
      description: "Go in depth with the full scope of what's possible for your custom check."
    },
    {
      name: "Partnerfort",
      href: "https://github.com/matthewowen-ma/partnerfort",
      description: "An interactive tool you host locally to experiment with configurations for your custom check."
    },
    {
      name: "CastleUI",
      href: "https://castle.ux.passfort.com/docs/core/getting-started#1-install",
      description: "The design language used for PassFort products. Follow this guide for styling your custom check. This is built on top of ChakraUI."
    },
    {
      name: "NestJS",
      href: "https://nestjs.com/",
      description: "The backend framework we have employed in modularizing this custom check code."
    },
    {
      name: "React",
      href: "https://react.dev/",
      description: "Frontend framework used for web development."
    },
    {
      name: "React Router",
      href: "https://reactrouter.com/en/main",
      description: "Routing library for a React frontend."
    },
    {
      name: "Typescript",
      href: "https://www.typescriptlang.org/",
      description: "Type-safe language used for the development of this custom check."
    }
  ];