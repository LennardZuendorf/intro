import * as React from "react";
import { titleCase } from "title-case";

function formatContent(children: React.ReactNode): React.ReactNode {
    return typeof children === 'string' ? titleCase(children) : children;
}

interface TypographyProps {
    children: React.ReactNode;
}

const BigTitle: React.FC<TypographyProps> = ({ children }) => {
    const content = formatContent(children);
    return <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{content}</h1>;
};


const SubBigTitle: React.FC<TypographyProps> = ({ children }) => {
    const content = formatContent(children);
    return <h1 className="scroll-m-20 text-xl font-bold tracking-tight text-muted-foreground">{content}</h1>;
};


const Title: React.FC<TypographyProps> = ({ children }) => {
    const content = formatContent(children);
    return <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl text-mute">{content}</h1>;
};


const SubTitle: React.FC<TypographyProps> = ({ children }) => {
    const content = formatContent(children);
    return <h4 className="scroll-m-20 text-large font-semibold tracking-tight text-muted-foreground">{content}</h4>;
};


const Header: React.FC<TypographyProps> = ({children}) => {
    const content = formatContent(children);
    return <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight lg:text-3xl first:mt-0">{content}</h2>;
};

const SubHeader: React.FC<TypographyProps> = ({children}) => {
    const content = formatContent(children);
    return <small className="text-sm font-medium leading-none text-muted-foreground">{content}</small>;
}

export {BigTitle,SubBigTitle, Title, SubTitle, Header, SubHeader};