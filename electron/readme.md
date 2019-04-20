
# DONE - electron番茄钟

## 正常流程

    配置工作时间TA和休息时间TB
    进入Ready状态
    按start
    进入Work状态。开始从TA计时
    每秒减少一秒，更新剩余时间，直到为零
    提示用户，时间完成
    建议休息TB时间
    用户确认后，进入Rest状态。开始从TB计时
    重复3，4
    建议工作TA时间
    用户确认
    重复2-9

## 异常流程

在Work，Rest状态，用户点击Stop按钮，则进入Ready状态


## 状态描述

    Ready状态。Start按钮可用，Stop不可用，计时标签显示TA。
    Work状态，Start不可用，Stop可用，计时标签为TA - 消逝的时间
    Rest状态。Start不可用，Stop可用，计时时间为TB - 消逝的时间

## 支持读取配置文件

可用在`<script>`标签内可用直接，类似Nodejs方式，访问文件系统。amazing！在Tomato Clock内，需要访问Clock的配置文件，比如间隔时间25分钟，休息时间5分钟。如下：

    {workMinutes:25,restMinutes:5}
