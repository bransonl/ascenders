import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Login {

    static String myUserName = "cmetramexs";
    static String myPassword = "helphalp";

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver","C:\\Users\\isxel\\Downloads\\chromedriver_win32\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();

        driver.get("http://127.0.0.1:8080/");

        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        // get the user name field of the account page
        WebElement username = driver.findElement(By.name("identifier"));

        // send my user name to fill up the box
        username.sendKeys(myUserName);

        // locate the "Next" button in the account page
        WebElement nextButton = driver.findElement(By.id("identifierNext"));
        nextButton.click();

        //explicitly wait until the password field is present in the page
        try {
            WebDriverWait wait = new WebDriverWait(driver, 10);
            // wait only until the password element becomes visible
            wait.until(ExpectedConditions.elementToBeClickable(By.name("password")));
            // now locate the password field in the current page
            WebElement password = driver.findElement(By.name("password"));
            // send password
            password.sendKeys(myPassword);
            // login and :)
            nextButton = driver.findElement(By.id("Login"));
            nextButton.click();
        } catch (Exception NoSuchElementException) {
            System.out.println("login name invalid");
        }
    }
}
