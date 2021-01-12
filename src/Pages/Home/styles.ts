import styled, { css } from 'styled-components/native';
import Feather from 'react-native-vector-icons/Feather';

interface ContainerProps {
    listView: boolean;
}

interface ContainerHeaderProps {
    opacityContainer: boolean;
}

export const Container = styled.View<ContainerProps>`
    flex: 1;

    ${(props) =>
        props.listView &&
        css`
            background-color: #000000;
        `
    }
`;

export const ContainerHeader = styled.View<ContainerHeaderProps>`
    ${(props) =>
        props.opacityContainer &&
        css`
            opacity: 0.2;
        `
    }
`;

export const ContainerButtonBarCode = styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 150px;
    align-items: center;
    justify-content: center;
`;

export const Camera = styled(Feather)`
    margin-left: 10px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 25px;
    padding: 25px;
`;

export const ContainerNfc = styled.View`
    flex-direction: row;
    padding-left: 20px;
    margin-right: 15px;
    align-items: center;
    justify-content: center;
`;

export const Avatar = styled.Image`
    width: 36px;
    height: 36px;
    border-radius: 36px;
`;

export const Logo = styled.Image`
    width: 48px;
    height: 30px;
    margin-left: 40px;
`;

export const ContainerOptions = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const TextTitle = styled.Text`
    font-family: 'RoundedMplus1c-Black';
    font-size: 19px;
    color: #FFF;
    padding-left: 25px;
`;

export const DarkenContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.1);
`

export const ContainerModal = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background: #000;
    opacity: 0.7;
`;

export const TextModal = styled.Text`
    font-family: 'RoundedMplus1c-Regular';
    font-size: 15px;
    color: #FFFFFF;
`;