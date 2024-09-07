import axios from "axios";

const EXPO_PUBLIC_FIREBASE_MASSAGE = process.env.EXPO_PUBLIC_FIREBASE_MASSAGE;

// Token的作用：
// 1. 身份验证。允许服务器识别发起请求的用户是否已经通过身份验证。
// 2. 权限控制。令牌不仅可以验证用户身份，还可以提供详细的权限信息。通过分析令牌，服务器可以决定用户是否有权访问特定的资源或执行特定的操作。
// 3. 状态保持。令牌通常包含到期时间，确保会话在一定时间后过期，增加安全性。

export async function getMessage(token) {
  // Accessing protected resources on Firebase
  // change rules to :
  // ".read": "auth.uid != null",  // Only authenticated users allowed
  // ".write": "auth.uid != null",  // Only authenticated users allowed

  // 一旦设置成上面的规则，必须在URL后面加上 ?auth=[token]
  const response = await axios.get(
    `${EXPO_PUBLIC_FIREBASE_MASSAGE}.json?auth=${token}`
  );
  return response.data;
}

