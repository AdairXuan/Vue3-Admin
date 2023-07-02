export const getTime = (): string => {
    let NowHour:number = new Date().getHours();
    let result: string = "";
    if(NowHour <   11)
    {
        result = "早上好!";
    }else if(NowHour >= 11 && NowHour <= 14)
    {
        result = "中午好!";
    }else if(NowHour > 14 && NowHour < 18)
    {
        result = "下午好!";
    }else
    {
        result = "晚上好!";
    }
    

    return result;
}