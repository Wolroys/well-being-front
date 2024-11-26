import React from "react";
import {Typography} from "antd";

import "./Text.scss";

interface ITextProps extends Record<string, any> {
    variant:
        | "h1_sb"
        | "h2_m"
        | "h2_sb"
        | "h3_r"
        | "h3_m"
        | "h3_sb"
        | "p_r"
        | "p_m"
        | "p_sb"
        | "span_m"
        | "span_r";
    className?: string;
    children: React.ReactNode;
}

const Text: React.FC<ITextProps> = ({
                                        variant,
                                        className,
                                        children,
                                        ...other
                                    }) => {
    const {Title, Paragraph, Text: AntText} = Typography;

    const classes = [`${variant}`];
    className && classes.push(className);

    const renderTypography = () => {
        switch (variant) {
            case "h1_sb":
                return (
                    <Title data-testid="Text" className={classes.join(" ")} {...other}>
                        {children}
                    </Title>
                );
            case "h2_m":
                return (
                    <Title
                        data-testid="Text"
                        level={2}
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Title>
                );
            case "h2_sb":
                return (
                    <Title
                        data-testid="Text"
                        level={2}
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Title>
                );
            case "h3_r":
                return (
                    <Title
                        data-testid="Text"
                        level={3}
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Title>
                );
            case "h3_m":
                return (
                    <Title
                        data-testid="Text"
                        level={3}
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Title>
                );
            case "h3_sb":
                return (
                    <Title
                        data-testid="Text"
                        level={3}
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Title>
                );
            case "p_r":
                return (
                    <Paragraph
                        data-testid="Text"
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Paragraph>
                );
            case "p_m":
                return (
                    <Paragraph
                        data-testid="Text"
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Paragraph>
                );
            case "p_sb":
                return (
                    <Paragraph
                        data-testid="Text"
                        className={classes.join(" ")}
                        {...other}>
                        {children}
                    </Paragraph>
                );
            case "span_m":
                return (
                    <AntText data-testid="Text" className={classes.join(" ")} {...other}>
                        {children}
                    </AntText>
                );
            case "span_r":
                return (
                    <AntText data-testid="Text" className={classes.join(" ")} {...other}>
                        {children}
                    </AntText>
                );
            default:
                return null;
        }
    };

    return <>{renderTypography()}</>;
};

export default Text;